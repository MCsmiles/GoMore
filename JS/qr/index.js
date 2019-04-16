function getValue() {

    qrLink = document.getElementById("link").value;
    qrImage = document.getElementById("qr")
    qrImage.src = "http://qr.liantu.com/api.php?text=" + qrLink;
    document.getElementById("qr").setAttribute("style", "")
    document.getElementById("qrtext").setAttribute("style", "display:none")

}