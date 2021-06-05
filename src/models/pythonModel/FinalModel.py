
import os
import cv2
import histomicstk as htk
import scipy as sp
import skimage.io
import skimage.measure
import skimage.color
import matplotlib.pyplot as plt
from scipy import misc
from scipy.ndimage import gaussian_filter
from keras.preprocessing.image import ImageDataGenerator,array_to_img, img_to_array, load_img 
import scipy
import sys, json
import numpy as np
import cython
import shutil
import keras
from keras import backend as K





def recall_m(y_true, y_pred):
    true_positives = K.sum(K.round(K.clip(y_true * y_pred, 0, 1)))
    possible_positives = K.sum(K.round(K.clip(y_true, 0, 1)))
    recall = true_positives / (possible_positives + K.epsilon())
    return recall

def precision_m(y_true, y_pred):
    true_positives = K.sum(K.round(K.clip(y_true * y_pred, 0, 1)))
    predicted_positives = K.sum(K.round(K.clip(y_pred, 0, 1)))
    precision = true_positives / (predicted_positives + K.epsilon())
    return precision

def f1_m(y_true, y_pred):
    precision = precision_m(y_true, y_pred)
    recall = recall_m(y_true, y_pred)
    return 2*((precision*recall)/(precision+recall+K.epsilon()))

model = []
model1 = keras.models.load_model('src\models\pythonModel\ResNet50_model',custom_objects={'f1_m':f1_m,'precision_m':precision_m,'recall_m':recall_m},compile=False)
model2 = keras.models.load_model('src\models\pythonModel\ResNet101_model',custom_objects={'f1_m':f1_m,'precision_m':precision_m,'recall_m':recall_m},compile=False)
model3 = keras.models.load_model('src\models\pythonModel\DenseNet169_model',custom_objects={'f1_m':f1_m,'precision_m':precision_m,'recall_m':recall_m},compile=False)

model.append(model1)
model.append(model2)
model.append(model3)





def load_image(imgpath):
    img = cv2.imread(imgpath)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    base=os.path.basename(imgpath)
    imagename=os.path.splitext(base)[0]
    return img, imagename





#reference image --> "D:\\BACHDataset\\Train\\Benign\\b022.tif"
def normalization(refimagepath,img,imagename):
    ref_image_file = (refimagepath)  # L1.png

    im_reference = cv2.imread(ref_image_file)
    im_reference = cv2.cvtColor(im_reference, cv2.COLOR_BGR2RGB)
    mean_ref, std_ref = htk.preprocessing.color_conversion.lab_mean_std(im_reference)

    # color normalization


    img_norm=htk.preprocessing.color_normalization.reinhard(img, mean_ref, std_ref)
    return img_norm





def convert(img, target_type_min, target_type_max, target_type):
    imin = img.min()
    imax = img.max()

    a = (target_type_max - target_type_min) / (imax - imin)
    b = target_type_max - a * imax
    new_img = (a * img + b).astype(target_type)
    return new_img





def segmentation(img_norm,img,imagename):
    
        # create stain to color map
    stainColorMap = {
        'hematoxylin': [0.65, 0.70, 0.29],
        'eosin':       [0.07, 0.99, 0.11],
        'dab':         [0.27, 0.57, 0.78],
        'null':        [0.0, 0.0, 0.0]
    }

    stain_1 = 'hematoxylin'   
    stain_2 = 'eosin'         
    stain_3 = 'null'          

    # create stain matrix
    W = np.array([stainColorMap[stain_1],
                  stainColorMap[stain_2],
                  stainColorMap[stain_3]]).T


    # color deconvolution
    img_stain=htk.preprocessing.color_deconvolution.color_deconvolution(img, W).Stains
#     plt.imshow(img_stain)    
    
    
    im_nuclei_stain = img_stain [:, :, 0]
        # segment foreground
    foreground_threshold = 120

    im_fgnd_mask = sp.ndimage.morphology.binary_fill_holes(
        im_nuclei_stain < foreground_threshold)

    min_radius = 10
    max_radius = 15


    im_log_max, im_sigma_max = htk.filters.shape.cdog(
        im_nuclei_stain, im_fgnd_mask,
        sigma_min=min_radius * np.sqrt(2),
        sigma_max=max_radius * np.sqrt(2)
    )

    #segment nuclei using local maximum clustering
    local_max_search_radius = 10

    im_nuclei_seg_mask, seeds, maxima = htk.segmentation.nuclear.max_clustering(
        im_log_max, im_fgnd_mask, local_max_search_radius)

    min_nucleus_area = 50

    im_nuclei_seg_mask = htk.segmentation.label.area_open(
        im_nuclei_seg_mask, min_nucleus_area).astype(np.int32)

    # compute nuclei properties
    objProps = skimage.measure.regionprops(im_nuclei_seg_mask)
    img_seg=skimage.color.label2rgb(im_nuclei_seg_mask, img_norm, bg_label=0)

    
    imgd = convert(img_seg, 0, 255, np.uint8)
    return imgd




def CNN(x):


    models = []
    diagnosis= ''

    for i in range(len(model)):
        models.append(model[i])


    img2 = cv2.resize(x,(224,224))
    plt.imshow(img2)
    img2 = np.reshape(img2,[1,224,224,3])    
    # Predict labels with models
    labels = []
    for m in models:
        pred = m.predict(img2)
        predicts=np.argmax(pred,axis=1)
        labels.append(predicts)


    labels = np.array(labels)
    labels = np.transpose(labels, (1, 0))
    labels = scipy.stats.mode(labels, axis=1)[0]
    labels = np.squeeze(labels)
    if(labels==0):
        diagnosis="Benign"
    if(labels==1):
        diagnosis="Carsinoma InSitu"
    if(labels==2):
        diagnosis="Invasive Carsinoma"
    if(labels==3):
        diagnosis="Normal"
    
    return labels
    



imgPath=sys.argv[1]
img,imagename=load_image(imgPath)
img_norm = normalization('src\\models\\pythonModel\\b022.tif',img,imagename)
imgd=segmentation(img_norm,img,imagename)
Labels=CNN(imgd)
send_message_back = str(Labels)


print(json.dumps(send_message_back))














