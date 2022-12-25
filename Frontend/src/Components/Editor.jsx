import React, { createContext, useContext, useRef } from 'react';
import { Editor as Edit } from '@tinymce/tinymce-react';

const EditorContext = createContext();
const EditorValueContext = createContext();

export const useEditor = () => useContext(EditorContext);
export const useEditorValue = () => useContext(EditorValueContext);

export default function Editor({children}) {
  const editorRef = useRef(null);

  const editorValue = () => {
    if (editorRef.current) {
      return editorRef.current.getContent();
    }
    return null;
  };

  const editor = () => {
    return (
      <>
        <Edit
          onInit={(evt, editor) => editorRef.current = editor}
          initialValue="<p>A new announcement...</p>"
          init={{
              selector: 'textarea#open-source-plugins',
              plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
              editimage_cors_hosts: ['picsum.photos'],
              menubar: 'edit view insert format tools table help',
              // menubar: false,
              toolbar: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview | insertfile image media template link anchor codesample | ltr rtl',
              toolbar_sticky: false,
              autosave_ask_before_unload: true,
              autosave_interval: '30s',
              autosave_prefix: '{path}{query}-{id}-',
              autosave_restore_when_empty: false,
              autosave_retention: '2m',
              image_advtab: true,
              importcss_append: true,
              icon: 'thin',
              file_picker_types: 'image',
              file_picker_callback: (callback, value, meta) => {
                  const input = document.createElement('input');
                  input.setAttribute('type', 'file');
                  input.setAttribute('accept', 'image/*');
              
                  input.addEventListener('change', (e) => {
                    const file = e.target.files[0];
              
                    const reader = new FileReader();
                    reader.addEventListener('load', () => {
                      /*
                        Note: Now we need to register the blob in TinyMCEs image blob
                        registry. In the next release this part hopefully won't be
                        necessary, as we are looking to handle it internally.
                      */
                      const id = 'blobid' + (new Date()).getTime();
                      const blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                      const base64 = reader.result.split(',')[1];
                      const blobInfo = blobCache.create(id, file, base64);
                      blobCache.add(blobInfo);
              
                      /* call the callback and populate the Title field with the file name */
                      callback(blobInfo.blobUri(), { title: file.name });
                    });
                    reader.readAsDataURL(file);
                  });
              
                  input.click();
              },
              templates: [
                { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
                { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
                { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
              ],
              template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
              template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
              height: 600,
              image_caption: true,
              quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
              noneditable_class: 'mceNonEditable',
              toolbar_mode: 'sliding',
              contextmenu: 'link image table',
              skin: 'oxide',
              content_css: 'default',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
          }}
          />
      </>
    )
  }

  // const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  // const isSmallScreen = window.matchMedia('(max-width: 1023.5px)').matches;

  return (
    <EditorContext.Provider value={editor}>
      <EditorValueContext.Provider value={editorValue}>
        {children}
      </EditorValueContext.Provider>
    </EditorContext.Provider>
  );
}
