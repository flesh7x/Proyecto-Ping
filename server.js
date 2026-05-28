
const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Simple IP validation regex
const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

app.post('/api/run', (req, res) => {
    const { command, ip } = req.body;

    // --- Security Validation ---
    // 1. Validate the command is one of the allowed commands
    if (command !== 'ping' && command !== 'traceroute') {
        return res.status(400).send('Error: Comando no válido.');
    }

    // 2. Validate the IP address format
    if (!ipRegex.test(ip)) {
        return res.status(400).send('Error: Dirección IP no válida.');
    }

    let shellCommand;
    const platform = process.platform;

    if (command === 'ping') {
        // The '-c 5' argument limits ping to 5 packets. This is important to ensure the command terminates.
        shellCommand = `ping -c 5 ${ip}`;
    } else { // command === 'traceroute'
        // macOS and Linux use different flags for traceroute.
        // This makes it work on macOS as requested.
        shellCommand = `traceroute ${ip}`;
    }

    exec(shellCommand, (error, stdout, stderr) => {
        if (error) {
            // Log the full error for debugging on the server
            console.error(`exec error: ${error}`);
            // Send a user-friendly error message and the actual stderr
            return res.status(500).send(`Error al ejecutar el comando.

${stderr}`);
        }
        res.send(stdout);
    });
});

app.listen(port, () => {
    console.log(`Servidor backend escuchando en http://localhost:${port}`);
    console.log('Para usar la aplicación, abre el archivo "index.html" en tu navegador.');
});
