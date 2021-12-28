import React from 'react';
import {
    render, cleanup, act, fireEvent
} from '@testing-library/react';
import { NoteProvider } from '../context/NoteContext';
import Editor from '../layout/editor/Editor';

const editor = () => render(
    <NoteProvider initialState={{
        note: {
            id: 'dfgh3245sdfg',
            title: 'CSS',
            tags: ['Web', 'design'],
            content: '# Getting Started with Create React App'
        },
        directories: [{
            id: '619f6488babbf',
            name: 'TWEB',
            notes: [
                {
                    id: 'dfgh3245sdfg',
                    title: 'CSS',
                    tags: ['Web', 'design'],
                    content: '# Getting Started with Create React App'
                }]
        }]
    }}
    >
        <Editor />
    </NoteProvider>
);

let container;
let textarea;
let preview;

describe('Editor Component', () => {
    beforeAll(() => {
        const edit = editor();
        container = edit.container;
        // testing layout
        const [textareaElement] = container.getElementsByClassName('editor-textarea');
        const [previewElement] = container.getElementsByClassName('preview-pannel');
        textarea = textareaElement;
        preview = previewElement;
    });
    afterAll(() => {
        cleanup();
    });
    it('Editor Component | All Editor layout components present', () => {
        // testing layout
        expect(container.getElementsByClassName('editor').length).toBe(1);
        expect(container.getElementsByClassName('resize-pannel-container').length).toBe(1);
        expect(container.getElementsByClassName('editor-textarea').length).toBe(1);
        expect(container.getElementsByClassName('preview-pannel').length).toBe(1);
    });
    it('Editor Component | Note content loaded in textarea', () => {
        expect(textarea.value).toBe('# Getting Started with Create React App');
    });
    it('Editor Component | Note content displayed in preview', () => {
        expect(preview.innerHTML.trim()).toBe('<h1>Getting Started with Create React App</h1>');
    });
    it('Editor Component | Preview updates when content change', () => {
        act(() => {
            textarea.value = '## Hello World';
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(textarea.value).toBe('## Hello World');
        expect(preview.innerHTML.trim()).toBe('<h2>Hello World</h2>');
    });
    it('Editor Component | Markdown to html conversion | Headlines', () => {
        act(() => {
            textarea.value = '# Heading level 1';
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(textarea.value).toBe('# Heading level 1');
        expect(preview.innerHTML.trim()).toBe('<h1>Heading level 1</h1>');
        act(() => {
            textarea.value = '## Heading level 2';
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(textarea.value).toBe('## Heading level 2');
        expect(preview.innerHTML.trim()).toBe('<h2>Heading level 2</h2>');
        act(() => {
            textarea.value = '### Heading level 3';
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(textarea.value).toBe('### Heading level 3');
        expect(preview.innerHTML.trim()).toBe('<h3>Heading level 3</h3>');
        act(() => {
            textarea.value = '#### Heading level 4';
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(textarea.value).toBe('#### Heading level 4');
        expect(preview.innerHTML.trim()).toBe('<h4>Heading level 4</h4>');
        act(() => {
            textarea.value = '##### Heading level 5';
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(textarea.value).toBe('##### Heading level 5');
        expect(preview.innerHTML.trim()).toBe('<h5>Heading level 5</h5>');
        act(() => {
            textarea.value = '###### Heading level 6';
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(textarea.value).toBe('###### Heading level 6');
        expect(preview.innerHTML.trim()).toBe('<h6>Heading level 6</h6>');
    });
    it('Editor Component | Markdown to html conversion | Paragraphs, Line Breaks', () => {
        act(() => {
            textarea.value = `I really like using Markdown.

I think I'll use it to format all of my documents from now on.`;
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(preview.innerHTML.trim()).toBe(`<p>I really like using Markdown.</p>
<p>I think I'll use it to format all of my documents from now on.</p>`);
        act(() => {
            textarea.value = `I really like using Markdown.

I think I'll use it to format all of my documents from now on.`;
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(preview.innerHTML.trim()).toBe(`<p>I really like using Markdown.</p>
<p>I think I'll use it to format all of my documents from now on.</p>`);
        act(() => {
            textarea.value = `This is the first line.  
And this is the second line.`;
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(preview.innerHTML.trim()).toBe(`<p>This is the first line.<br>
And this is the second line.</p>`);
    });
    it('Editor Component | Markdown to html conversion | Text Formatting | Bold, Italic', () => {
        act(() => {
            textarea.value = 'I just love **bold text**.';
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(preview.innerHTML.trim()).toBe('<p>I just love <strong>bold text</strong>.</p>');
        act(() => {
            textarea.value = 'I just love __bold text__.';
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(preview.innerHTML.trim()).toBe('<p>I just love <strong>bold text</strong>.</p>');
        act(() => {
            textarea.value = 'Love**is**bold';
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(preview.innerHTML.trim()).toBe('<p>Love<strong>is</strong>bold</p>');
        act(() => {
            textarea.value = 'Italicized text is the *cat\'s meow*.';
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(preview.innerHTML.trim()).toBe('<p>Italicized text is the <em>cat\'s meow</em>.</p>');
        act(() => {
            textarea.value = 'Italicized text is the _cat\'s meow_.';
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(preview.innerHTML.trim()).toBe('<p>Italicized text is the <em>cat\'s meow</em>.</p>');
        act(() => {
            textarea.value = 'A*cat*meow';
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(preview.innerHTML.trim()).toBe('<p>A<em>cat</em>meow</p>');
        act(() => {
            textarea.value = 'This text is ***really important***.';
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(preview.innerHTML.trim()).toBe('<p>This text is <em><strong>really important</strong></em>.</p>');
        act(() => {
            textarea.value = 'This text is ___really important___.';
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(preview.innerHTML.trim()).toBe('<p>This text is <em><strong>really important</strong></em>.</p>');
    });
    it('Editor Component | Markdown to html conversion | Blockquotes', () => {
        act(() => {
            textarea.value = '> Dorothy followed her through many of the beautiful rooms in her castle.';
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(preview.innerHTML.trim()).toBe(`<blockquote>
<p>Dorothy followed her through many of the beautiful rooms in her castle.</p>
</blockquote>`);
        act(() => {
            textarea.value = `> Dorothy followed her through many of the beautiful rooms in her castle.
>
>> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.`;
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(preview.innerHTML.trim()).toBe(`<blockquote>
<p>Dorothy followed her through many of the beautiful rooms in her castle.</p>
<blockquote>
<p>The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.</p>
</blockquote>
</blockquote>`);
    });
    it('Editor Component | Markdown to html conversion | Lists | Ordered, Unordered ', () => {
        act(() => {
            textarea.value = `1. First item
2. Second item
3. Third item
4. Fourth item`;
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(preview.innerHTML.trim()).toBe(`<ol>
<li>First item</li>
<li>Second item</li>
<li>Third item</li>
<li>Fourth item</li>
</ol>`);
        act(() => {
            textarea.value = `1. First item
8. Second item
3. Third item
5. Fourth item`;
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(preview.innerHTML.trim()).toBe(`<ol>
<li>First item</li>
<li>Second item</li>
<li>Third item</li>
<li>Fourth item</li>
</ol>`);
        act(() => {
            textarea.value = `1. First item
2. Second item
3. Third item
    1. Indented item
    2. Indented item
4. Fourth item`;
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(preview.innerHTML.trim()).toBe(`<ol>
<li>First item</li>
<li>Second item</li>
<li>Third item
<ol>
<li>Indented item</li>
<li>Indented item</li>
</ol>
</li>
<li>Fourth item</li>
</ol>`);
        act(() => {
            textarea.value = `- First item
- Second item
- Third item
- Fourth item`;
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(preview.innerHTML.trim()).toBe(`<ul>
<li>First item</li>
<li>Second item</li>
<li>Third item</li>
<li>Fourth item</li>
</ul>`);
        act(() => {
            textarea.value = `* First item
* Second item
* Third item
* Fourth item`;
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(preview.innerHTML.trim()).toBe(`<ul>
<li>First item</li>
<li>Second item</li>
<li>Third item</li>
<li>Fourth item</li>
</ul>`);
        act(() => {
            textarea.value = `+ First item
+ Second item
+ Third item
+ Fourth item`;
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(preview.innerHTML.trim()).toBe(`<ul>
<li>First item</li>
<li>Second item</li>
<li>Third item</li>
<li>Fourth item</li>
</ul>`);
    });
    it('Editor Component | Markdown to html conversion | Code, Escaping Backticks, Code Blocks', () => {
        act(() => {
            textarea.value = 'At the command prompt, type `nano`.';
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(preview.innerHTML.trim()).toBe('<p>At the command prompt, type <code>nano</code>.</p>');
        act(() => {
            textarea.value = '``Use `code` in your Markdown file.``';
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(preview.innerHTML.trim()).toBe('<p><code>Use `code` in your Markdown file.</code></p>');
        act(() => {
            textarea.value = `    <html>
        <head>
        </head>
    </html>`;
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(preview.innerHTML.trim()).toBe(`<pre><code>&lt;html&gt;
    &lt;head&gt;
    &lt;/head&gt;
&lt;/html&gt;</code></pre>`);
    });
    it('Editor Component | Markdown to html conversion | Links', () => {
        act(() => {
            textarea.value = 'My favorite search engine is [Duck Duck Go](https://duckduckgo.com).';
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(preview.innerHTML.trim()).toBe('<p>My favorite search engine is <a href="https://duckduckgo.com">Duck Duck Go</a>.</p>');
        act(() => {
            textarea.value = 'My favorite search engine is [Duck Duck Go](https://duckduckgo.com "The best search engine for privacy").';
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(preview.innerHTML.trim()).toBe('<p>My favorite search engine is <a href="https://duckduckgo.com" title="The best search engine for privacy">Duck Duck Go</a>.</p>');
        act(() => {
            textarea.value = `<https://www.markdownguide.org>
<fake@example.com>`;
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(preview.innerHTML.trim()).toBe(`<p><a href="https://www.markdownguide.org">https://www.markdownguide.org</a><br>
<a href="mailto:fake@example.com">fake@example.com</a></p>`);
    });
    it('Editor Component | Markdown to html conversion | Images', () => {
        act(() => {
            textarea.value = '![The San Juan Mountains are beautiful!](/assets/images/san-juan-mountains.jpg "San Juan Mountains")';
            fireEvent.keyUp(textarea, { key: 'Enter', code: 'Enter', charCode: 13 });
        });
        expect(preview.innerHTML.trim()).toBe('<p><img src="/assets/images/san-juan-mountains.jpg" alt="The San Juan Mountains are beautiful!" title="San Juan Mountains"></p>');
    });
});
