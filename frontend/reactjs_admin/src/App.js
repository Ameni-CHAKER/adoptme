import { STATE_LOGIN, STATE_SIGNUP,isAuth } from './components/AuthForm';
import GAListener from './components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from './components/Layout';
import PageSpinner from './components/PageSpinner';
import AuthPage from './pages/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';

const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
const CategoriesPage = React.lazy(() => import('./pages/CategoriesPage'));
const AddCategory = React.lazy(() => import('./pages/AddCategory'));
const UpdateCategory = React.lazy(() => import('./pages/UpdateCategory'));
const AddUser = React.lazy(() => import('./pages/AddUser'));
const UpdateUser = React.lazy(() => import('./pages/UpdateUser'));
const Pet = React.lazy(() => import('./pages/Pet'));
const PetDetails = React.lazy(() => import('./pages/PetDetails'));
const UpdatePetPage = React.lazy(() => import('./pages/UpdatePetPage'));


const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />

            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <Route exact path="/home" component={DashboardPage} />
                <Route exact path="/categories" component={CategoriesPage} />
{/*                 <Route exact path="/login-modal" component={AuthModalPage} />
 */}{/*                 <Route exact path="/buttons" component={ButtonPage} />
 */}{/*                 <Route exact path="/cards" component={CardPage} />
 */}{/*                 <Route exact path="/widgets" component={WidgetPage} />
 */}{/*                 <Route exact path="/typography" component={TypographyPage} />
 */}{/*                 <Route exact path="/alerts" component={AlertPage} />
 */}{/*                 <Route exact path="/tables" component={TablePage} />
 */}{/*                 <Route exact path="/badges" component={BadgePage} />
 */}{/*                 <Route exact path="/button-groups" component={ButtonGroupPage} />
 */}{/*                 <Route exact path="/dropdowns" component={DropdownPage} />
 */}{/*                 <Route exact path="/progress" component={ProgressPage} />
 */}{/*                 <Route exact path="/modals" component={ModalPage} />
 */}{/*                 <Route exact path="/forms" component={FormPage} />
 */}{/*                 <Route exact path="/input-groups" component={InputGroupPage} />
 */}{/*                 <Route exact path="/charts" component={ChartPage} />
 */}                <Route exact path="/addCategory" component={AddCategory} />
                    <Route exact path="/updateCategory" component={UpdateCategory} />
                    <Route exact path="/addUser" component={AddUser} />
                    <Route exact path="/updateUser" component={UpdateUser} />
                    <Route exact path="/Pet" component={Pet} />
                    <Route exact path="/PetDetails" component={PetDetails} />
                    <Route exact path="/updatePetPage" component={UpdatePetPage} />
                    </React.Suspense>
                  </MainLayout>
                  <Redirect 
                    exact 
                    path="/login"
                    layout={EmptyLayout} />
                </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
