
document.addEventListener('DOMContentLoaded', () => {
    const ipInput = document.getElementById('ip-input');
    const validationStatus = document.getElementById('validation-status');
    const pingBtn = document.getElementById('ping-btn');
    const tracerouteBtn = document.getElementById('traceroute-btn');
    const output = document.getElementById('output');

    const API_ENDPOINT = 'http://localhost:3000/api/run';

    function validateIP() {
        const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        const isValid = ipRegex.test(ipInput.value);
        
        validationStatus.style.backgroundColor = isValid ? '#2ecc71' : '#e74c3c';
        pingBtn.disabled = !isValid;
        tracerouteBtn.disabled = !isValid;
        
        return isValid;
    }

    async function runCommand(command) {
        if (!validateIP()) {
            output.textContent = 'Por favor, introduce una dirección IP válida.';
            return;
        }

        output.textContent = `Ejecutando ${command}...`;
        pingBtn.disabled = true;
        tracerouteBtn.disabled = true;

        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    command: command,
                    ip: ipInput.value
                }),
            });

            const result = await response.text();
            output.textContent = result;

        } catch (error) {
            output.textContent = `Error de conexión con el servidor.

¿Estás seguro de que el servidor está corriendo?

Detalles: ${error.message}`;
        } finally {
            validateIP(); // Re-enable buttons if IP is still valid
        }
    }

    ipInput.addEventListener('input', validateIP);
    pingBtn.addEventListener('click', () => runCommand('ping'));
    tracerouteBtn.addEventListener('click', () => runCommand('traceroute'));

    // Initial validation
    validateIP();
});
