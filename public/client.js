
document.getElementById('uploadForm').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
  
    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const resultElement = document.getElementById('uploadResult');
        if (data.success) {
          resultElement.textContent = `Plik przesłany pomyślnie! (${data.fileName})`;
        } else {
          resultElement.textContent = `Błąd: ${data.message}`;
        }
      })
      .catch((err) => {
        console.error('Błąd podczas przesyłania pliku:', err);
        document.getElementById('uploadResult').textContent = 'Wystąpił błąd.';
      });
  });
  
  document.getElementById('loadFilesButton').addEventListener('click', () => {
    fetch('/files')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          displayFiles(data.files);
        } else {
          console.error('Błąd podczas ładowania plików:', data.message);
          alert('Nie udało się załadować listy plików.');
        }
      })
      .catch((err) => {
        console.error('Błąd podczas pobierania plików:', err);
        alert('Wystąpił błąd podczas pobierania plików.');
      });
  });
  

  function displayFiles(files) {
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';
  
    files.forEach((file) => {
      const listItem = document.createElement('li');
      listItem.textContent = file;
 
      const downloadLink = document.createElement('a');
      downloadLink.href = file;
      downloadLink.textContent = ' [Pobierz]';
      downloadLink.style.marginLeft = '10px';
      listItem.appendChild(downloadLink);
  
      fileList.appendChild(listItem);
    });
  }
  