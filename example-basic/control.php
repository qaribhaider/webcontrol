<?php
$client_id = $_GET['c'];
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="Syed Qarib">

        <title>Web Control - Basic Example</title>

        <!-- Required Scripts -->
        <script src="../jquery-1.10.1.min.js"></script>
        <script src="../socket.io-1.3.4.js"></script>
        <script src="../webcontrol.plugin.js"></script>

        <!-- Demo Scripts -->
        <link href="./assets/css/bootstrap.min.css" rel="stylesheet">
        <link href="./assets/css/demo.css" rel="stylesheet">
        <script src="./assets/js/bootstrap.js"></script>

        <!-- Get client id -->
        <script>
            var client_id = '<?= $client_id ?>';
        </script>
    </head>

    <body>

        <div class="container">

            <div class="row">
                <div class="col-md-12">
                    <a nwc-action="scrollup" nwc-value="50" href="#" class="btn btn-default nwc-trigger">Scroll Up</a>
                    <a nwc-action="scrolldown" nwc-value="50" href="#" class="btn btn-default nwc-trigger">Scroll Down</a>
                    <a nwc-action="scrollto" nwc-value="#about" href="#" class="btn btn-default nwc-trigger">About</a>
                    <a nwc-action="scrollto" nwc-value="#contact" href="#" class="btn btn-default nwc-trigger">Contact</a>
                </div>
            </div>

        </div> <!-- /container -->

        <script>
            $(document).ready(function () {
                /**
                 * Initiate client
                 */
                webControlClient(client_id);
            });
        </script>

    </body>
</html>
