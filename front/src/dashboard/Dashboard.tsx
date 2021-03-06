import gql from "graphql-tag";
import React from "react";
import { Query } from "react-apollo";
import { Route, RouteComponentProps } from "react-router";
import Account from "./account/Account";
import "./Dashboard.scss";
import DashboardMenu from "./DashboardMenu";
import SlipsContainer from "./slips/SlipsContainer";
import Exports from "./exports/exports";

export const GET_ME = gql`
  {
    me {
      id
      name
      email
      phone
      companies {
        admin { id name }
        siret
        name
        address
      }
      userType
    }
  }
`;

export default function Dashboard({ match }: RouteComponentProps) {
  return (
    <Query query={GET_ME}>
      {({ loading, error, data }) => {
        if (loading) return "Chargement...";
        if (error) return `Erreur ! ${error.message}`;

        return (
          <div id="dashboard" className="dashboard">
            <DashboardMenu me={data.me} match={match} />

            <div className="dashboard-content">
              <Route
                path={`${match.path}/slips`}
                render={() => <SlipsContainer me={data.me} />}
              />
              <Route
                path={`${match.path}/account`}
                render={() => <Account me={data.me} />}
              />
              <Route
                path={`${match.path}/exports`}
                render={() => <Exports me={data.me} />}
              />
            </div>
          </div>
        );
      }}
    </Query>
  );
}
