export async function sendCommand(command) {
  // Send the command to the backend and return the response
  const response = await fetch('/command', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({command}),
  });

  return response.json();
}
