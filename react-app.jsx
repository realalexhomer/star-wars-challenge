let emitter = new EventEmitter();

let Character = React.createClass({
  handleClick: function() {
    emitter.emit('update', this.props.filmIds, this.props.name);
  },
  render: function () {
    return (
      <li onClick={this.handleClick}
          className={this.props.isSelected ? 'selected character' : 'character'}>
          <h3 className="character-text">
            {this.props.name}
          </h3>
      </li>
    )
  }
});

let Film = React.createClass({
  render: function() {
    let formatDate = (dateStr) => {
      let d = new Date(dateStr);
      
      return DaysOfTheWeek[d.getDay()] + ',' + d.toDateString().substr(3);
    };
    return (
      <li className={this.props.isVisible ? 'film visible' : 'film'}>
        <div className="film-text">
          <span className="film-title">{this.props.title}</span>
          <span className="divider"> - </span>
          <span className="film-date">{formatDate(this.props.releaseDate)}</span>
        </div>
      </li>
    );
  }
});

let App = React.createClass({
  getInitialState: function(){
    return {
      filmsTop: 40,
      charactersData: charactersData.map(c => {
        return {
          isSelected: false,
          name: c.name,
          filmIds: c.filmIds,
          id: c.id
        }
      }),
      filmsData: filmsData.map(f => {
        return {
          isVisible: false,
          title: f.title,
          releaseDate: f.release_date,
          id: f.id
        }
      })
    }
  },
  handleUpdate: function(visibleIds, selectedName) {
    let newFilmsData = this.state.filmsData.map(f => {
      if (visibleIds.indexOf(f.id) === -1) {
        f.isVisible = false;
      } else {
        f.isVisible = true;
      }
      return f;
    });
    
    let newCharactersData = this.state.charactersData.map(c => {
      if (c.name !== selectedName) {
        c.isSelected = false;
      } else {
        c.isSelected = true;
      }
      return c;
    });
    
    this.setState({
      filmsTop: 40,
      filmsData: newFilmsData,
      charactersData: newCharactersData
    });
  },
  componentDidMount: function() {
    emitter.on('update', this.handleUpdate);
    this.handleUpdate(this.state.charactersData[0].filmIds, this.state.charactersData[0].name)
    setInterval(() => {
      this.setState(function(previousState) {
        return {filmsTop: previousState.filmsTop + 1};
      });
    }, 100);
  },
  render: function() {
    let characters = this.state.charactersData.map(c => {
      return (
        <Character 
          name={c.name}
          filmIds={c.filmIds}
          isSelected={c.isSelected}
          key={c.id}>
        </Character>
      );
    });
    let films = this.state.filmsData.map(f => {
      return (
        <Film title={f.title} 
              releaseDate={f.releaseDate}
              isVisible={f.isVisible}
              key={f.id}>
        </Film>
      );
    });
    return (
      <div>
        <ul className="characters">
          {characters}
        </ul>
        <ul className="films" style={{top: this.state.filmsTop}}>
          {films}
        </ul>
      </div>
    );
  }
});
