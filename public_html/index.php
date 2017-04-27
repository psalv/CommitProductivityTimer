<!DOCTYPE html>
<html lang="en">

<head>

    <!--=========================================== WEBPAGE METADATA ====================================-->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Productivity Timer</title>
    <!-- Favicons
    ================================================== -->
    <link rel="manifest" href="assets/img/favicon/manifest.json">


    <!--=========================================== CSS FILES ===========================================-->
    <!-- Bootstrap Core CSS -->
    <link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css">

    <!-- CSS -->
    <link rel="stylesheet" type="text/css" href="assets/less/main.css">

    <!-- Custom Fonts -->
    <link href="//fonts.googleapis.com/css?family=Bevan" rel="stylesheet">

    <!-- JS for text-to-speech -->
    <script type="text/javascript" src="assets/js/mespeak.js"></script>
    <script type="text/javascript" src="assets/js/header.js"></script>


</head>

<body>

<!--=========================================== MAIN FILES ==========================================-->
<?php
$page = "index-page";
$hasGmap = true;
?>


<div class="row mainContainer text-lowercase">
    <div class="row center-block text-center title">
        <h1>Be productive.</h1>
    </div>
    <div class="row center-block mainBlockOuter">
        <div class="center-block mainBlock">
            <div>
                <h2>Start: <span id="beginTime"></span></h2>
                <h2>Elapsed: <span id="bckColour"><span id="difTime">0.00 minutes</span></span></h2>
                <h2>Sound: <span class="pointer" id="sndOn">On</span> / <span class="pointer" id="sndOff">off</span></h2>

                <div class="text-center">
                    <button class="btn" id="pause" onclick="pause()">Pause</button>
                    <button class="btn" id="reset" onclick="reset()">Reset</button>
                    <button class="btn" id="breakButton" onclick="takeBreak()">break</button>
                </div>

                <h2 class="hidden" id="breakField">Break: <span id="breakTime">0.00</span>/15.00 minutes</h2>
            </div>
        </div>

    </div>
    <div class="row center-block text-center title">
        <h1>Produce results.</h1>
    </div>
</div>



<!--=========================================== JS SCRIPTS ==========================================-->
<!-- jQuery -->
<script src="assets/js/jquery.min.js" type="text/javascript"></script>

<!-- Bootstrap Core JavaScript -->
<script src="assets/js/bootstrap.min.js" type="text/javascript"></script>

<!-- Plugin JavaScript -->
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>

<!-- Custom JavaScript -->
<script type="text/javascript" src="assets/js/footer.js"></script>

</body>
</html>
