import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import faCode from '@fortawesome/fontawesome-free-solid/faCode';
import faBook from '@fortawesome/fontawesome-free-solid/faBook';
import faGithub from '@fortawesome/fontawesome-free-brands/faGithub';
import { ExpandableListItem, ListItem } from 'components';
import { classes } from 'common/util';
import { actions } from 'reducers';
import styles from './Navigator.module.scss';

class Navigator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categoriesOpened: {},
      scratchPaperOpened: true,
      query: '',
    };
  }

  componentDidMount() {
    const { algorithm } = this.props.current;
    if (algorithm) {
      this.toggleCategory(algorithm.categoryKey, true);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { algorithm } = nextProps.current;
    if (algorithm) {
      this.toggleCategory(algorithm.categoryKey, true);
    }
  }

  toggleCategory(key, categoryOpened = !this.state.categoriesOpened[key]) {
    const categoriesOpened = {
      ...this.state.categoriesOpened,
      [key]: categoryOpened,
    };
    this.setState({ categoriesOpened });
  }

  toggleScratchPaper(scratchPaperOpened = !this.state.scratchPaperOpened) {
    this.setState({ scratchPaperOpened });
  }

  handleChangeQuery(e) {
    const { categories } = this.props.directory;
    const categoriesOpened = {};
    const query = e.target.value;
    categories.forEach(category => {
      if (this.testQuery(category.name) || category.algorithms.find(algorithm => this.testQuery(algorithm.name))) {
        categoriesOpened[category.key] = true;
      }
    });
    this.setState({ categoriesOpened, query });
  }

  testQuery(value) {
    const { query } = this.state;
    const refine = string => string.replace(/-/g, ' ').replace(/[^\w ]/g, '');
    const refinedQuery = refine(query);
    const refinedValue = refine(value);
    return new RegExp(`(^| )${refinedQuery}`, 'i').test(refinedValue) ||
      new RegExp(refinedQuery, 'i').test(refinedValue.split(' ').map(v => v && v[0]).join(''));
  }

  render() {
    const { categoriesOpened, scratchPaperOpened, query } = this.state;
    const { className } = this.props;
    const { categories, scratchPapers } = this.props.directory;
    const { algorithm, scratchPaper } = this.props.current;

    const categoryKey = algorithm && algorithm.categoryKey;
    const algorithmKey = algorithm && algorithm.algorithmKey;
    const gistId = scratchPaper && scratchPaper.gistId;

    return (true);
  }
}

export default connect(({ current, directory, env }) => ({ current, directory, env }), actions)(
  Navigator,
);
