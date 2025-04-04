// Datos de médicos almacenados en localStorage
const doctors = [
    { name: 'Juan Perez', specialty: 'Cardiología', city: 'México', country: 'México' },
    { name: 'Felipe Hernandez', specialty: 'Neurología', city: 'Buenos Aires', country: 'Argentina' },
    { name: 'Leandro Gutierrez', specialty: 'Pediatría', city: 'Madrid', country: 'España' }
];

// Guardar datos de médicos en localStorage si no están ya guardados
if (!localStorage.getItem('doctors')) {
    localStorage.setItem('doctors', JSON.stringify(doctors));
}

// Función para cargar todos los médicos y mostrarlos al cargar la página
function loadDoctors() {
    const doctorsData = JSON.parse(localStorage.getItem('doctors')) || [];
    displayResults(doctorsData);
}

// Función para filtrar los médicos
function filterDoctors() {
    const searchBar = document.getElementById('searchBar').value.toLowerCase();
    const name = document.getElementById('name').value.toLowerCase();
    const specialty = document.getElementById('specialty').value.toLowerCase();
    const city = document.getElementById('city').value.toLowerCase();
    const country = document.getElementById('country').value.toLowerCase();

    const doctorsData = JSON.parse(localStorage.getItem('doctors')) || [];

    const results = doctorsData.filter(doctor =>
        (searchBar === '' || doctor.name.toLowerCase().includes(searchBar) || doctor.specialty.toLowerCase().includes(searchBar)) &&
        (name === '' || doctor.name.toLowerCase().includes(name)) &&
        (specialty === '' || doctor.specialty.toLowerCase().includes(specialty)) &&
        (city === '' || doctor.city.toLowerCase().includes(city)) &&
        (country === '' || doctor.country.toLowerCase().includes(country))
    );

    displayResults(results);
}

// Función para mostrar resultados en la página de búsqueda
function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p class="text-center text-muted">No se encontraron resultados.</p>';
        return;
    }

    results.forEach(doctor => {
        const doctorCard = `
            <div class="col-md-4 mb-4">
                <div class="card text-center">
                    <div class="card-body">
                        <h5 class="card-title">${doctor.name}</h5>
                        <p class="card-text"><strong>Especialidad:</strong> ${doctor.specialty}</p>
                        <p class="card-text"><strong>Ciudad:</strong> ${doctor.city}</p>
                        <p class="card-text"><strong>País:</strong> ${doctor.country}</p>
                        <button class="btn btn-primary" onclick="openChat('${doctor.name}')">Ver más</button>
                    </div>
                </div>
            </div>
        `;
        resultsContainer.innerHTML += doctorCard;
    });
}

// Variable para almacenar el nombre del médico con el que se está chateando
let currentDoctor = '';

// Función para abrir el chat con el nombre del doctor
function openChat(doctorName) {
    currentDoctor = doctorName;
    document.getElementById('chatModalLabel').innerText = `Chat con ${doctorName}`;
    clearChat();
    const chatModal = new bootstrap.Modal(document.getElementById('chatModal'));
    chatModal.show();
}

// Función para limpiar el chat cuando se abre un nuevo chat con un doctor
function clearChat() {
    const chatMessages = document.getElementById('chatContainer');
    chatMessages.innerHTML = ''; // Limpiar mensajes anteriores
}

// Función para enviar un mensaje
function sendMessage(event) {
    event.preventDefault();
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (message) {
        // Agregar mensaje del usuario
        addMessage('Tú', message, 'user');

        // Simular una respuesta del doctor después de un breve tiempo
        setTimeout(() => {
            addMessage(currentDoctor, "Gracias por tu mensaje. ¿En qué puedo ayudarte?", 'doctor');
        }, 1000);

        // Limpiar campo de entrada
        messageInput.value = '';
    }
}

// Función para agregar un mensaje al chat
function addMessage(sender, text, senderType) {
    const chatMessages = document.getElementById('chatContainer');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', senderType === 'user' ? 'user' : 'doctor');
    messageElement.innerHTML = `<div class="message-bubble"><strong>${sender}:</strong> ${text}</div>`;
    chatMessages.appendChild(messageElement);

    // Desplazarse al último mensaje
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Cargar todos los médicos al cargar la página
document.addEventListener('DOMContentLoaded', loadDoctors);
