## Dymka ARG

##### An alternate reality game, created as an authorial project.

---

[{youtube} Daniel Myslivets YouTube channel](https://www.youtube.com/@DanielM)

---

An ARG *(Alternate Reality Game)* that took place on the Daniel Myslivets channel, developed by me in collaboration with a team I led.

My main roles included:
- developing the universe and lore (in collaboration with artists),
- designing the technical part,
- organizing and leading the development.

The project was divided into several acts. Below is a brief overview of the mini-projects implemented in each.

### Technical Solutions in the ARG.

#### Act 1

For the first act, we needed to create an improvised RDP connection in the browser. For this, we built a login page styled like Windows 10, requiring a password. After the correct password was entered, PHP rendered a different page with a PowerShell terminal. The terminal sent each command to the server, received a response, and displayed it in the window.

The server and all necessary commands were implemented using Express.js.

#### Act 2

For the second act, we literally needed to commit vandalism on a website running a MediaWiki engine. This was achieved using `::before` blocks overlaid on images.

<img src="/mdcontent/wikivandal.png" alt="Wiki vandalism" />

This led people to a WordPress blog. We needed a user who could access draft posts but had no other permissions to prevent anything from going wrong. For this, we wrote a WordPress plugin that restricted the user 'Kiffa' in every way, but initially overlooked post tags. This was fixed later.

#### Act 3

For the third act, we deactivated the blog website, leaving a placeholder for the provider 'MDTK'. The players' task was to call tech support, where they were met with a labyrinthine phone menu—a huge number of branches with long wait times.

A phone menu scheme was developed:

<img src="/mdcontent/arg-phonecall.png" alt="Phonecall menu">

Voices were then assigned to departments, audio was processed and converted to a format suitable for FreePBX.

The phone menu itself was built as a set of instructions for Asterisk, generated from a YAML file by a custom script.

```yaml
techbegin:
    1: cryaboutit
    2: KDEFreeBSD
    3: enterSIDORCode
    4: WelcomeYUR
    5: ipcollection
    6: crisis
    %timeout: Repeat()
```

Here, file names are specified, and pressing a key would direct the user to the corresponding audio file and, consequently, the menu with the same name.

We then configured SIP, linked phone numbers, and made it live on the network.

#### Act 4

For the fourth act of the ARG, an "improvised chat" system was developed — a pseudo-dialogue where the server generates pre-prepared responses, creating the illusion of a live conversation.
The logic was moved to a single API endpoint of the form: `/vrc/{functionName}`

Each public function exported from `vrc.js` automatically became an available endpoint. Below is the final interface of the system.

##### Main API Methods

**1.** `availableAddress ? userId`

Returns a list of chats available to the user:
- chat name
- its current online status
- identifier

**2.** `getChatInfo ? uuid & chatId`

Returns the same structure, but only for one specific chat.

##### Working with History and Context

**3.** `getChatHistory ? uuid & chatId`

Outputs the complete dialog history (messages, direction (incoming/outgoing)).

**4.** `getRandomQuestions ? uuid & chatId`

Generates 4 random questions available to the user in the current dialog state.
Features:
- questions **do not repeat** — selected considering already asked ones;
- each question has an appearance "stage";
- the stage increases every 2 questions asked;
- this creates a sense of "progression" and conversation development.

**5.** `getMood ? chatId`

Each question has a positive or negative effect, influencing the interlocutor's mood.
The function returns the current state:
`Sad | Neutral | Happy`

##### Asking Questions and Delayed Responses

**6.** `askQuestion ? uuid & chatId & questionId`

Registers the question choice and returns an **offset** — the number of seconds to wait before calling `resolveQuestion`.
This creates a "response delay" effect, simulating typing delay or contemplation.

**7.** `resolveQuestion ? uuid`

Sends the prepared response to the user.
Only works if enough time has passed since `askQuestion`;
if not, returns an *"not enough time passed"* error.

**8.** `isPendingAnswer ? uuid`

Used when opening a chat on the frontend.
Returns:
- `pending: Boolean`
- if a response is pending — the remaining `offset` until `resolveQuestion` can be called.

**9.** `finishReturningFile ? uuid & chatId`

If the user asked a question with `id === "final"`, this endpoint sends the file necessary to complete the act.

#### Act 5

In the fifth act, I created a [**Hacknet**](https://store.steampowered.com/app/365450/Hacknet/) parody: a fully-fledged terminal environment where the player interacts with a "virtual OS" through a terminal simulation.
Both the frontend and backend were implemented in Svelte 5 in less than 7 hours.

##### Frontend

**Custom Terminal Interface:**

I implemented the terminal "from scratch," without libraries — with a completely custom input handler.

Supported:
- cursor movement: **Home/End**, **←/→**;
- line editing: **Backspace/Delete**;
- history navigation: **↑/↓**;
- output control: **PageUp/PageDown**;
- **Ctrl combinations** (Ctrl+C, Ctrl+V, Ctrl+X);
- clipboard paste;
- correct handling of Unicode.
- color highlighting via custom placeholder tags (`{{g}}`, `{{b}}`, etc.).

**`TAB` Autocomplete works like in UNIX**
- cyclic scrolling through options;
- commands + files depend on the current domain and directory;

**The SubmitCommand Function (Frontend-Backend Link):**

Each command is sent to the server along with the **session context**:

```js
context = {
    path,
    domain: host,
    username,
    password
}
```

This allows the backend to know:
- where the player is "located" (`path`);
- which "server" they are connected to (`domain`);
- who they are authorized as (`username`);
- what password is being used (`password`).

After executing a command, the frontend:
- saves its own **prefix** in the form
  `{{g}}user@domain{{/}}:{{b}}/current/path{{/}}$`
- then appends the sent command to the previous line and adds it to history;
- parses the binary response:
  - file → download;
  - text → output;
  - JSON → context change and output.

Upon receiving `response.context`, the terminal updates its internal state, for example:
- changing directory
- changing domain
- updating login/password
- updating autocomplete

Thus, the session context constantly mutates, simulating real terminal work.

##### Backend

**Virtual OS**

I implemented a custom mini-kernel of CLI commands:

Supported:
* `ls` — output the contents of a virtual directory
* `cd` — navigate paths
* `open` — read text files
* `download` — return binary data
* `probe` — "scan" a network node
* `connect` — simulate an SSH connection
* `SSBrute` — a pseudo-password brute-forcer

Commands change the context state (path, domain, available files, connection status), allowing for cohesive gameplay built on command scripts.

**Separated File Systems**

Different domains have their own directories — the server essentially "spins up" different computers within the ARG.

**Scanning and Network Actions**

`probe`, `connect`, `SSBrute` create the illusion of "network security":
- execution delays,
- pseudo-port scanning,
- reports on found services,
- successful/unsuccessful connection scenarios.

**Support for Binary Responses**

If a command should return a file — the server sends `Content-Disposition: attachment`, and the frontend automatically initiates a download.

##### Summary:

The project was created in a short timeframe specifically for the ARG act. However, during development, the concept emerged to expand this prototype into a full-fledged standalone game in the style of Hacknet. For now, this is just a direction for future experiments, but the foundation has been laid.

## Project Summary:

Dymka ARG became a project that combined my work as a developer, writer, technical architect, and team organizer.
This experience gave me an understanding of how to build complex interactive systems, work with a large number of diverse technologies, and create a cohesive user experience at the level of a game.

The project became an excellent showcase of my skills in development, project management, and creating interactive solutions that can be expanded into full-fledged products.