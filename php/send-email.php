<?php

// Replace this with the sender email address
$from_email = 'no-reply12345678@hotmail.com';

function url() {
  return sprintf(
    "%s://%s",
    isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http',
    $_SERVER['SERVER_NAME']
  );
}

if ($_POST) {

   $name = trim(stripslashes($_POST['name']));
   $user_email = trim(stripslashes($_POST['email']));
   $subject = trim(stripslashes($_POST['subject']));
   $contact_message = trim(stripslashes($_POST['message']));
   
   if ($subject == '') { $subject = "Contact Form Submission"; }

   // Set Message
   $message = "";
   $message .= "Email from: " . $name . "<br />";
   $message .= "Email address: " . $user_email . "<br />";
   $message .= "Message: <br />";
   $message .= nl2br($contact_message);
   $message .= "<br /> ----- <br /> This email was sent from your site " . url() . " contact form. <br />";

   // Set From: header
   $from = $name . " <" . $from_email . ">";

   // Email Headers
   $headers = "From: " . $from . "\r\n";
   $headers .= "Reply-To: " . $user_email . "\r\n";
   $headers .= "MIME-Version: 1.0\r\n";
   $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

   ini_set("sendmail_from", $from_email); // for windows server
   $mail = mail($user_email, $subject, $message, $headers);

   if ($mail) { echo "OK"; }
   else { echo "Something went wrong. Please try again."; }

}

?>
