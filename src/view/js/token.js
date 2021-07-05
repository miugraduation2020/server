
// $(function () {
//     $('form#login').on('submit', function (e) {
//         e.preventDefault();
//         $.ajax({
//             type: 'POST',
//             url: '/user/sign-in',
//             data: $('form').serialize(),
//             success: function (data, textStatus, request) {
//                 console.log("Response: " + data);
//                 console.log("textStatus: " + textStatus);
//                 if (data != "False") {
//                     $('form')[0].reset();
//                     console.log("Login Successful");

//                     console.log("Authorization " + request.getResponseHeader('Authorization'));

//                     document.cookie = "token=" + request.getResponseHeader('Authorization');
//                     localStorage.setItem("token", request.getResponseHeader('Authorization'));
//                     window.location.assign("login");
//                     // check();
//                 }
//                 else {
//                     $('form')[0].reset();
//                     console.log("Login failed! Check authentication credentials");
//                     alert("Login failed! Check authentication credentials");
//                 }
//             },
//             error: function (data, textStatus, request) {
//                 window.location.assign("pathProfile");
//             }
//         });
//         return false;
//     });
// });
