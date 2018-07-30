import React from 'react';
import { Layout } from 'antd';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import MobileLogo from './LogoBox/MobileLogo';
import Notice from './Notice';
import SettingMenu from './SettingMenu';
import SiderMenu from './SiderMenu';
import ContentRoute from './../../utils/ContentRoute';
import container from './container';
import menus from './menus';
import logo from './../../images/logo.png';
import { Header, Content, MenuBar, Right } from './style';
import GlobalFooter from './GlobalFooter';

let isMobile = false;
enquireScreen(mobile => (isMobile = mobile));

class Basic extends React.Component {
  enquireHandler = null;

  state = { isMobile };

  componentDidMount() {
    this.enquireHandler = enquireScreen(mobile =>
      this.setState(() => ({ isMobile: mobile })),
    );
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
  }

  handleMenuBarClick = () => {
    const { layout, collapse } = this.props;
    collapse(!layout.collapsed);
  };

  render() {
    const { user, layout, collapse } = this.props;
    const permissions = user.permissions ? user.permissions.read : [];

    return (
      <Layout>
        <SiderMenu
          menus={menus}
          isMobile={this.state.isMobile}
          collapsed={layout.collapsed}
          collapse={collapse}
          logo={logo}
        />
        <Layout>
          <Header>
            {this.state.isMobile && <MobileLogo to="/" image={logo} />}
            <MenuBar
              type={layout.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.handleMenuBarClick}
            />
            <Right>
              <Notice />
              <SettingMenu />
            </Right>
          </Header>

          <Content>
            <ContentRoute menus={menus} permissions={permissions} />
          </Content>

          <GlobalFooter />
        </Layout>
      </Layout>
    );
  }
}

export default container(Basic);
