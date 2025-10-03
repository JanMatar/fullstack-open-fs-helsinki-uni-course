#0.4
sequenceDiagram
    participant B as Browser
    participant S as Server

    Note right of B: User types into the text field and clicks Save

    B->>S: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate S
    S->>S: Store note (content + timestamp)
    S-->>B: 302 Found
    deactivate S

    Note right of B: B follows the redirect automatically

    B->>S: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate S
    S-->>B: HTML document
    deactivate S

    B->>S: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate S
    S-->>B: the css file
    deactivate S

    B->>S: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate S
    S-->>B: the JavaScript file
    deactivate S

    Note right of B: JS runs in the B and fetches the latest notes as JSON

    B->>S: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate S
    S-->>B: JSON including the new note
    deactivate S

    Note over B: B executes callback and re-renders the list of notes


#0.5
sequenceDiagram
    participant B as Browser
    participant S as Server

    B->>S: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate S
    S-->>B: HTML (SPA shell)
    deactivate S

    B->>S: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate S
    S-->>B: CSS
    deactivate S

    B->>S: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate S
    S-->>B: JavaScript (SPA logic)
    deactivate S

    Note right of B: B executes spa.js<br/>sets up event listeners, renders UI

    B->>S: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate S
    S-->>B: JSON notes
    deactivate S

    Note over B: JS renders notes into the DOM (no full page reload)


#0.6
sequenceDiagram
    participant B as Browser (SPA)
    participant S as Server

    Note right of B: User types a note and clicks Save<br/>(JS intercepts submit; prevents page reload)

    B->>B: Update in-memory notes + rerender DOM immediately

    B->>S: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa<br/>Content-Type: application/json<br/>{ content, date }
    activate S
    S-->>B: 201 Created 
    deactivate S

    Note over B: UI is already updated; no redirect , no page reload
