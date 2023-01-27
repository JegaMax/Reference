import SectionTitleWrapper from './section-title-wrapper';
import Splitter from './splitter';
import Title from './title';
import TitleLink from './title-link';
import TitleText from './title-text';

const Section = ({ children }) => {
  return <>{children}</>;
};

Section.Wrapper = SectionTitleWrapper;
Section.Title = Title;
Section.Link = TitleLink;
Section.Text = TitleText;
Section.Splitter = Splitter;

export default Section;
