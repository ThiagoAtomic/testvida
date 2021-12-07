<?

if (isset($_POST['name']) &&
    !empety($_POST['name'])
)

$nome = addcslashes($_POST['name']);
$email = addcslashes($_POST['email']);
$msg = addcslashes($_POST['message']);
$tel = addcslashes($_POST['phone']);


$to = "admrvsadvogados@outlook.com";
$subject = "Contato pelo Site";
$body =  "Nome: ".$nome. "\n".
        "Email: ".$email. "\n".
        "Mensagem: ".$msg.
        "Telefone cliente: ".$tel;

$header = "From:lucas-rdm@hotmail.com"."\r\n"."Reply-To:".$email
         ."\e\n"."X=Mailer:PHP/".phpversion();

if(mail($to, $subject, $body, $header)){
    echo ("Email enviado com sucesso");
}
else{
    echo ("Email nao enviado");

}

?>