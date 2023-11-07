```mermaid

sequenceDiagram
    participant browser
    participant server

    Note over browser: User writes a note and clicks the Save button.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Created [{"content": "zxcv", "date": "2023-11-07T22:58:38.916Z"}, ...]
    deactivate server

    Note right of browser: The browser excutes callback function and updates the list of notes with the new note