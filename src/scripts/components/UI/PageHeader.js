'use strict';

import React from 'react/addons';

class UIPageHeader extends React.Component {
  render() {
    return (
      <div>
        <h2 className="pageheader"><i className={'mega-octicon octicon-' + this.props.icon }></i> {this.props.text}</h2>
        <hr />
      </div>
    );
  }
}

export default UIPageHeader;
