1. Wprowadzenie
Celem projektu jest stworzenie prostego serwera WWW w Node.js, który obsługuje pliki statyczne, umożliwia ich przesyłanie i udostępnia listę dostępnych plików w katalogu. Serwer jest w stanie obsłużyć wiele jednoczesnych połączeń dzięki wykorzystaniu socket.io. Klienci komunikują się z serwerem przez przeglądarkę internetową. Dodatkowo projekt zawiera prosty frontend z formularzem przesyłania plików i listą dostępnych zasobów.
________________________________________
2. Funkcjonalności
1.	Serwowanie plików statycznych:
o	Użytkownik może przeglądać i pobierać pliki statyczne z katalogu serwera.
2.	Przesyłanie plików:
o	Użytkownik może przesłać pliki z lokalnego urządzenia do serwera za pomocą formularza.
3.	Lista dostępnych plików:
o	Serwer udostępnia dynamicznie generowaną listę dostępnych plików w katalogu publicznym.
4.	Obsługa błędów:
o	Informowanie użytkownika w przypadku, gdy plik nie istnieje lub wystąpi problem z przesyłaniem.
________________________________________
3. Struktura projektu
- public/
  - index.html        // Plik frontendowy z interfejsem użytkownika
  - client.js         // Logika frontendowa
  - styles.css        // Stylizacja strony
  - uploads/          // Folder na przesłane pliki
- server.js           // Główny plik serwera
________________________________________
4. Instalacja i uruchomienie
4.1. Wymagania
•	Node.js (zalecana wersja: 16+)
•	npm (Node Package Manager)
4.2. Kroki instalacji
1.	Sklonowanie projektu:
git clone https://github.com/lawerski/sieci_projekt
cd sieci_projekt
2.	Instalacja zależności:
npm install
3.	Uruchomienie serwera:
node server.js
4.	Dostęp do aplikacji: Otwórz przeglądarkę i przejdź pod adres: http://localhost:3000.
Jeśli chcesz uruchomić aplikację w kontenerze Docker:
Przy pomocy Docker

Uruchom aplikację w kontenerze:

docker run -p 3000:3000 --rm my-node-app

•	-p 3000:3000: Mapuje port 3000 kontenera na port 3000 na hoście.
•	--rm: Usuwa kontener po zakończeniu działania aplikacji.
Dostęp do aplikacji: Otwórz przeglądarkę i przejdź pod adres: http://localhost:3000.

________________________________________
5. Plik serwera (server.js)
5.1. Importy modułów
 
•	express: Framework do obsługi żądań HTTP.
•	http: Moduł do uruchomienia serwera HTTP.
•	socket.io: Biblioteka do obsługi komunikacji w czasie rzeczywistym przez WebSocket.
•	fs: Moduł do obsługi plików i systemu plików.
•	path: Narzędzie do obsługi ścieżek plików.
•	multer: Middleware do obsługi przesyłania plików.
________________________________________
5.2. Konfiguracja Multer 
•	destination: Określa folder, do którego zapisywane są przesłane pliki.
•	filename: Zachowuje oryginalną nazwę przesyłanego pliku.
________________________________________
5.3. Główne endpointy
5.3.1. Endpoint do przesyłania plików
 
•	Obsługuje przesyłanie pojedynczych plików za pomocą multipart/form-data.
•	Zwraca odpowiedź JSON z informacją o powodzeniu operacji.
________________________________________
5.3.2. Endpoint do uzyskania listy plików
 
•	Rekurencyjnie przeszukuje katalog public i zwraca listę plików.
•	Zwraca odpowiedź w formacie JSON zawierającą tablicę nazw plików.
________________________________________
5.3.3. Obsługa połączenia WebSocket
 

•	Obsługuje zapytania o zawartość plików za pomocą socket.io.
•	Wysyła odpowiedzi do klientów w czasie rzeczywistym.
________________________________________
6. Frontend
6.1. Plik index.html
Zawiera prosty interfejs z:
1.	Formularzem do przesyłania plików.
2.	Przycisk do załadowania listy dostępnych plików.
3.	Listę wyświetlającą dostępne pliki.
________________________________________
6.2. Plik client.js
Obsługuje logikę:
•	Przesyłania plików na serwer.
•	Pobierania i wyświetlania listy plików.
________________________________________
6.3. Plik styles.css
Odpowiada za stylizację strony, zapewniając:
1.	Proste i przejrzyste tło.
2.	Wyraźne przyciski i pola formularza.
3.	Estetyczną prezentację listy plików.
________________________________________
7. Przykładowe scenariusze użycia
1.	Użytkownik otwiera przeglądarkę i przechodzi pod adres http://localhost:3000.
2.	W sekcji „Przesyłanie plików” wybiera plik i klika „Wyślij plik”.
3.	W sekcji „Dostępne pliki” klika przycisk „Załaduj dostępne pliki”, aby zobaczyć przesłane pliki.
4.	Klikając na link „Pobierz”, pobiera plik na swoje urządzenie.
________________________________________
8. Możliwe rozszerzenia
1.	Obsługa autoryzacji użytkowników.
2.	Wsparcie dla większych plików (np. za pomocą streamingu).
3.	Umożliwienie usuwania plików przez użytkowników.

