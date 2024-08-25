```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Created<br/> {status: "Note created"}
    deactivate server
 
    Note right of browser: The browser has already updated the UI before the server's response