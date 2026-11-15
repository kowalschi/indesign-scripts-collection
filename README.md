# InDesign Scripts Collection (2019 – today)

Production scripts I wrote for Adobe InDesign while working as a graphic designer and DTP specialist.
Each one removes a task I was repeating by hand. They are grouped by year so the progression is visible:
from ten-line helpers in 2019 to tools with dialogs, Excel input and batch processing.

The folders dated **2019–2022 were written before AI coding assistants existed** — from the InDesign
scripting reference, the Adobe forums and Stack Overflow. Where a script started from a forum answer,
the link is kept in the file. From late 2024 onward I also use AI assistants when writing scripts.

| Folder | Scripts | What they do |
|---|---|---|
| `2019-2020_layout-helpers/` | 19 | Fit or scale frames to page, margins or bleed; set bleed and margins; resize the page from a selection; create and align the legal (health-warning) band at 10% / 15% of the format. The building blocks that later became the [batch resize](https://github.com/kowalschi/indesign-batch-resize) script. |
| `2020-2022_ebook-production/` | 45 | A pipeline that converted print books into EPUB and interactive PDF for several publishers: metadata and ISBN read from Excel, title styles applied by search, chapter breaks, image handling, hyperlinks and e-mail links, unused style cleanup, footnote conversion and renumbering, batch processing of whole folders, character counts for invoicing. |
| `2024_export-text-from-indesign/` | 6 | Cleans a document and exports its text in a structured form; converts Excel sheets to TXT and XML for comparison with a content-management system. |
| `2024_arrange-objects-in-grid/` | 1 | Palette that arranges selected objects in a rows × columns grid with gaps. |
| `2024_chains/` | 2 | Finds numbered paragraphs and copies each into the next numbered paragraph ("chained" notes); search for an object and focus on it. |
| `2025_book-styling/` | 18 | Style automation for a book: find a pattern and apply a sequence of paragraph styles, justify by line count, count lines per frame. |
| `2026_catalog-image-numbering/` | 4 | Numbers the images in a catalogue layout and builds linked text frames sized to the column grid. |

## Notes

- File names are the ones I use in my Scripts Panel, some in Romanian (`titlu` = title, `note subsol` = footnotes, `calcul caractere` = character count).
- Paths inside the older scripts point to my local folders; change them before running.
- Third-party scripts I use alongside these (Kasyan Servetsky, Peter Kahrel, Marc Autret, William Campbell and others) are not included.

© Dan Ichimescu
