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

  const editor = (props) => {

    return (
      <>
        <Edit
          onInit={(evt, editor) => editorRef.current = editor}
          initialValue={props.initialValue ? props.initialValue : null }
          init={{
              browser_spellcheck: true,
              init_instance_callback: (editor) => {
                // console.log(editor.initialValue)
                // console.log(`Editor: ${editor.id} is now initialized.`);
              },
              placeholder: "....",
              // contextmenu: false,
              selector: 'textarea#open-source-plugins',
              paste_data_images: false,
              plugins: ' importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap  emoticons',
              editimage_cors_hosts: ['picsum.photos'],
              menubar: 'edit view insert format tools table help',
              // menubar: false,
              toolbar: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview | insertfile image template link anchor codesample | ltr rtl',
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
