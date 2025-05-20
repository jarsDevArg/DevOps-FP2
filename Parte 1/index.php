<!DOCTIPE HTML>
<html></html>
    <head>
        <title>PF2 - Javier Rodriguez</title>
    </head>
    <body>
        <h1>PF2 - Javier Rodriguez</h1>
        <?php
            
            $servername = 'db';
            $username = 'user';
            $password = 'password';
            $dbname = 'pf2';

            $conn = new mysqli($servername, $username, $password, $dbname);

            if ($conn->connect_error) {
                die("Fallo la conexion: " . $conn->connect_error);
            }
            echo "Conectado correctamente a la db<br><br>";
            $sql = "SELECT id, nombre, email FROM usuario";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                echo "<table><tr><th>ID</th><th>Nombre</th><th>Email</th></tr>";
                // Mostrar datos de cada fila
                while($row = $result->fetch_assoc()) {
                    echo "<tr><td>" . $row["id"]. "</td><td>" . $row["nombre"]. "</td><td>" . $row["email"]. "</td></tr>";
                    }
                    echo "</table>";
                    } else {
                        echo "No se encontraron resultados.";
                }
                $conn->close(); 
        ?>
    </body>
</html>