## GMS-UTML-Patcher

---

[{github} Source code](https://github.com/ZAZiOs/GMS-UTML-Patcher) &nbsp;&nbsp; [{download} Download](https://github.com/ZAZiOs/GMS-UTML-Patcher/releases/tag/v1.2.0)

---

**GMS-UTML-Patcher** is a universal tool I developed for modifying GameMaker Studio (GMS) game resources, based on the [UndertaleModLib](https://github.com/UnderminersTeam/UndertaleModTool) library.
It allows creating and distributing patches **without altering or rebuilding the original game files**, making it completely safe from a copyright and EULA perspective.

### Core Features

- Applying patches to `data.win` files and similar GameMaker Studio resource containers.
- Supports modifying most data types:
  - GML code
  - fonts
  - graphics (sprites, textures, UI)
  - audio
- Flexible configuration via a single JSON file, allowing for precise description of changes.
- Supports checksum verification and protection mechanisms to ensure the patch is applied only to compatible game versions.
- The ability to distribute **only the patch set**, without including original resources, thereby avoiding the distribution of modified `data.win` files and not infringing on copyright.

### Architecture

- **The tool's core is C#**, using [UndertaleModLib](https://github.com/UnderminersTeam/UndertaleModTool) to access the game resource structure.
- CLI support: suitable for both pipeline integration and manual application.
- The configuration system is fully documented in [Configuration.md](https://github.com/ZAZiOs/GMS-UTML-Patcher/blob/main/Configuration.md), making the tool self-sufficient.

### What It's For

GMS-UTML-Patcher is suitable for any tasks related to modifying GameMaker Studio games:

- localization (Russian/foreign);
- graphical patches;
- UI/UX improvements;
- bug fixes and fan enhancements;
- custom mods;
- data updates without distributing protected content.

Its philosophy is simple: *"Down with xdelta! Long live smart patches"*

This makes the tool convenient, legal, and versatile for modding and localization communities.