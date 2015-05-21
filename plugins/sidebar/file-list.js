'use strict';

const React = require('react');
const List = require('react-material/components/List');

const FileList = React.createClass({

  componentDidMount: function(){
    this.remove_nextFile = app.keypress(app.keypress.CTRL_TAB, this.nextFile);
    this.remove_previousFile = app.keypress(app.keypress.CTRL_SHIFT_TAB, this.previousFile);
  },
  componentWillUnmount: function(){
    if(this.remove_nextFile) {
     this.remove_nextFile();
    };
    if(this.remove_previousFile) {
     this.remove_previousFile();
    };
  },
  previousFile: function(){
    this.changeFile({ direction: 'prev' });
  },
  nextFile: function() {
    this.changeFile({ direction: 'next' });
  },
  changeFile: function(move) {
    const { workspace, loadFile } = this.props;
    const filename = workspace.filename.deref();

    workspace.directory.forEach(function(x, i) {
      if(x.get('name') === filename) {
        if(i === workspace.directory.size - 1) {
          i = -1;
        }
        const shift = move.direction === 'prev' ? i - 1 : i + 1;
        const switchFile = workspace.directory.getIn([shift, 'name']);
        loadFile(switchFile);
      }
    });
  },
  render: function(){
    return (
      <List>
        {this.props.children}
      </List>
    );
  }
});

module.exports = FileList;
