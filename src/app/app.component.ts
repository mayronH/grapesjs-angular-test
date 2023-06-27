import { Component, OnInit } from '@angular/core';
import grapesjs from 'grapesjs';
import * as blocksBasic from 'grapesjs-blocks-basic';
import plugin from 'grapesjs-preset-newsletter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  _editor: any;
  var = 'General Kenobi';

  ngOnInit(): void {
    this._editor = this.initialize();

    // set HTML/CSS/etc
    const html = `<h1>Hello There!</h1>`;
    this._editor.setComponents(html);

    this._editor.BlockManager.add('var-block', {
      label: 'Simple variable',
      content: this.var,
    });

    console.log(this._editor.getHtml());
    console.log(this._editor.getCss());
  }

  private initialize() {
    return grapesjs.init({
      // Indicate where to init the editor. You can also pass an HTMLElement
      container: '#gjs',
      plugins: [plugin, blocksBasic.default],

      // Get the content for the canvas directly from the element
      // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
      fromElement: true,
      // Size of the editor
      // height: '300px',
      width: 'auto',
      // Disable the storage manager for the moment
      storageManager: {
        type: 'local', // Type of the storage, available: 'local' | 'remote'
        autosave: true, // Store data automatically
        autoload: true, // Autoload stored data on init
        stepsBeforeSave: 1, // If autosave enabled, indicates how many changes are necessary before store method is triggered
        options: {
          local: {
            // Options for the `local` type
            key: 'gjsProject', // The key for the local storage
          },
        },
      },
      // Avoid any default panel
      // panels: { defaults: [] },
    });
  }
}
