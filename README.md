# markdown-textarea-react
a **Node Package** that displays a textarea form input that accepts markdown syntax and converts value to html
## Install
`npm i markdown-textarea-react`
### Basic use
```js
import React, { useState } from "react"; 
import { MarkdownTextarea } from "markdown-textarea-react";
function App() 
  let [ textValue, setTextValue ] = useState=("");
  return (
    <div className="App">
      <MarkdownTextarea 
        source={DEFAULT_VALUE} 
        callback={setTextValue} 
        displayTextarea={true} // set to 'false' to hide textarea input
        verticalAutoResize={true} // Enlarges textarea when content overflows
        />
    </div>
  );
}
const DEFAULT_VALUE = "# *Header tags*\n## *h*<sup>2</sup>*O*\n### h<sub>3</sub>\n### Table\n|header| header2|header3| header4|\n| --- |\n|row1|column2|etc| more|\n|column1|row2|row| more|\n> **Blockquote** with ***inline code*** - `var a = [];` \n### Code Block\n```\nvar a = [];\nvar b = {};\n```\n#### Unordered List\n- li\n- li\n  - nested li w/ [link](https://www.google.com)\n  - *nested* li w/ **picture** ![trees](https://www.arborday.org/images/hero/medium/hero-aerial-forest-evergreen-trees.jpg)[50]\n- li\n#### Can specify width & height for Images\n![trees](https://www.arborday.org/images/hero/medium/hero-aerial-forest-evergreen-trees.jpg)[100,150] ![trees](https://www.arborday.org/images/hero/medium/hero-aerial-forest-evergreen-trees.jpg)[200] ![trees](https://www.arborday.org/images/hero/medium/hero-aerial-forest-evergreen-trees.jpg)"

export default App;
```
## How to Use
**Markdown syntax that can be used are:**
- Inline Elements (Low Level):
  - code
  - strong
  - em
  - img
  - a
  - sup
  - sub

- Single Line Elements (High Level):
  - paragraph tags(p)
  - heading tags(h1-h6)
  - blockquotes(currently a single line element, will be upgraded to multiline eventually)
- Multiline Groups (High Level):
  - Tables
  - Code blocks
  - Unordered Lists

### Inline Elements (Low Level)
- Inline Elements ***can*** be nested within high level elements ***but can't*** be nested within another inline element. Exception:`<strong><em>text</em></strong>`
- Examples:
  - `###### *text*` = `<h6><em>text</em></h6>` **(works)**
  - `**5<sup>5</sup>**` =  'strong' tag with the value `5<sup>5</sup>`**(doesn't work)**
  - `***text***` = `<strong><em>text</em></strong>` **(works)**
#### code-inline
  - Use: `` `text` ``(backticks)
  - HTML output: `<code>text</code>`
  - Preview: `text`
#### strong
  - Use: `**text**`
  - HTML output: `<strong>text</strong>`
  - Preview: **text**
#### em
  - Use: `*text*`
  - HTML output: `<em>text</em>`
  - Preview: *text*
#### strong & em
  - Use: `***text***`
  - HTML output: `<strong><em>text</em></strong>`
  - Preview: ***text***
#### img
  - Use: `![trees](https://i.pinimg.com/originals/40/20/70/402070277d6004a9c5b62e18b0fb4578.jpg)`
  - **Can Also Add**: `[200,250]` after closing parenthesis to specify width & height
  - HTML output: `<img src="https://i.pinimg.com/originals/40/20/70/402070277d6004a9c5b62e18b0fb4578.jpg" alt="trees" />`
  - Preview: ![trees](https://i.pinimg.com/originals/40/20/70/402070277d6004a9c5b62e18b0fb4578.jpg)
#### a
  - Use: `[google](https://google.com)`
  - HTML output: `<a href="https://google.com">google</a>`
  - Preview: [google](https://google.com)
#### sup
  - Use: `5<sup>5</sup>`
  - HTML output: `5<sup>5</sup>`
  - Preview: 5<sup>5</sup>
#### sub
  - Use: `5<sub>5</sub>`
  - HTML output: `5<sub>5</sub>`
  - Preview: 5<sub>5</sub>
### Single Line Elements (High Level)
- High Level elements ***can't*** contain any other high level element within itself.
- High Level elements ***can*** have multiple inline elements nested within.
- Examples:
  - `> ### text` = `<blockquote>###### text</blockquote>` **(doesn't work)**
  - `### *hey* **you**` =  `<h3><em>hey</em> <strong>you</strong></h3>`**(works)**
#### p
**'p' tag is default**
Each line break gets wrapped in a 'p' tag if no other high level element has been called
  - Use: `text`
  - HTML output: `<p>text</p>`
#### headings
**h1-h6**
  - Use: `# heading` - Can add up to 6 `#`'s
  - HTML output: `<h1>heading</h1>`
#### blockquote
  - Use: `> text`
  - HTML output: `<blockquote>text</blockquote>`
  ### MultiLine Groups (High Level)

#### table
  - Use:
```markdown
| column1 | column2 |
| --- |
| td1 | td2 |
| td3 | td4 |
```
  - HTML output:
```html
<table>
  <thead>
    <tr>
      <th>column1</th>
      <th>column2</th>
    </tr>
  <thead/>
  <tbody>
    <tr>
      <td>td1</td>
      <td>td2</td>
    </tr>
    <tr>
      <td>td3</td>
      <td>td4</td>
    </tr>
  <tbody/>
</table>
```

#### code-multiline
  - Use: 3 backticks, `` ``` ``, on their own line wrapping code block

`` ``` ``
```
  var a = [];
  var b = {};
```
`` ``` ``

  - HTML output:
```html
<div>
  <code>
    var a = [];<br />
    var b = {};<br />
  <code/>
</div>
```
#### ul
  - Use:
  ```markdown
  - li1
  - li2
    - nestedLi1
    - nestedLi2
  - li3
  ```
  - HTML output:
```html
<ul>
  <li>li1</li>
  <li>li2</li>
  <ul>
    <li>nestedLi1</li>
    <li>nestedLi2</li>
  </ul>
  <li>li3</li>
</ul>
```
