import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Context_A } from "./connections/context";

import News_PAGEE from "./screens/directions/dota/news";
import Players_PAGE from "./screens/directions/dota/players";
import Teams_PAGE from "./screens/directions/dota/teams";
import Protokols_PAGE from "./screens/directions/dota/protokols";
import Meetings_PAGE from "./screens/directions/dota/meetings";
import Applications_PAGE from "./screens/directions/dota/applications";
import RegApplications_PAGE from "./screens/directions/dota/reg_applications";
import Meeting_PAGE from "./screens/directions/dota/meeting";
import Team_PAGE from "./screens/directions/dota/team";
import Tournament_PAGE from "./screens/directions/dota/tournament";
import Tournaments_PAGE from "./screens/directions/dota/tournaments";
import EdiTteam_PAGE from "./screens/directions/dota/edit_team";
import RegTeam_PAGE from "./screens/directions/dota/reg_team";
import RegPlayer_PAGE from "./screens/directions/dota/reg_player";
import EditStructure_PAGE from "./screens/directions/dota/edit_structure";

import News_PAGEE_ from "./screens/directions/cs/news";
import Players_PAGE_ from "./screens/directions/cs/players";
import Teams_PAGE_ from "./screens/directions/cs/teams";
import Protokols_PAGE_ from "./screens/directions/cs/protokols";
import Meetings_PAGE_ from "./screens/directions/cs/meetings";
import Applications_PAGE_ from "./screens/directions/cs/applications";
import RegApplications_PAGE_ from "./screens/directions/cs/reg_applications";
import Meeting_PAGE_ from "./screens/directions/cs/meeting";
import Team_PAGE_ from "./screens/directions/cs/team";
import Tournament_PAGE_ from "./screens/directions/cs/tournament";
import Tournaments_PAGE_ from "./screens/directions/cs/tournaments";
import EdiTteam_PAGE_ from "./screens/directions/cs/edit_team";
import RegTeam_PAGE_ from "./screens/directions/cs/reg_team";
import RegPlayer_PAGE_ from "./screens/directions/cs/reg_player";
import EditStructure_PAGE_ from "./screens/directions/cs/edit_structure";

import News_PAGEE__ from "./screens/directions/bascketball/news";
import Players_PAGE__ from "./screens/directions/bascketball/players";
import Teams_PAGE__ from "./screens/directions/bascketball/teams";
import Protokols_PAGE__ from "./screens/directions/bascketball/protokols";
import Meetings_PAGE__ from "./screens/directions/bascketball/meetings";
import Applications_PAGE__ from "./screens/directions/bascketball/applications";
import RegApplications_PAGE__ from "./screens/directions/bascketball/reg_applications";
import Meeting_PAGE__ from "./screens/directions/bascketball/meeting";
import Team_PAGE__ from "./screens/directions/bascketball/team";
import Tournament_PAGE__ from "./screens/directions/bascketball/tournament";
import Tournaments_PAGE__ from "./screens/directions/bascketball/tournaments";
import EdiTteam_PAGE__ from "./screens/directions/bascketball/edit_team";
import RegTeam_PAGE__ from "./screens/directions/bascketball/reg_team";
import RegPlayer_PAGE__ from "./screens/directions/bascketball/reg_player";
import EditStructure_PAGE__ from "./screens/directions/bascketball/edit_structure";

import Help_PAGE from "./screens/regular/help";
import Razrabam_PAGE from "./screens/regular/razrabam";
import Blog_PAGE from "./screens/regular/blog";
import P404_PAGE from "./screens/regular/404.JSX";
import Leha_dr_PAGE from "./screens/regular/leha";
import UserAgreement_PAGE from "./screens/regular/user_agreement";

import Login_PAGE from "./screens/regular/login";
import Profile_PAGE from "./screens/regular/profile";
import News_PAGE from "./screens/regular/news";
import Community_PAGE from "./screens/community/community";
import Disputes_PAGE from "./screens/community/disputes";
import Transfers_PAGE from "./screens/community/transfers";
import Apps_PAGE from "./screens/community/apps";
import Musik_PAGE from "./screens/regular/musik";
import Cash_PAGE from "./screens/regular/cash";
import Chat_PAGE from "./screens/regular/chat";
import Disput_PAGE from "./screens/community/disput";
import Editprofile_PAGE from "./screens/regular/edit_profile";
import Follow_PAGE from "./screens/regular/follow";
import Offers_PAGE from "./screens/regular/offers";
import Tech_PAGE from "./screens/regular/techwork";

const Router = () => {
  return (
    <BrowserRouter>
      <Context_A>
        <Routes>
          <Route element={<News_PAGE />} path="/" />
          <Route element={<UserAgreement_PAGE />} path="/user_agreement" />
          <Route element={<Login_PAGE />} path="/login" />
          <Route element={<Profile_PAGE />} path="/profile/:id" />
          <Route element={<Community_PAGE />} path="/community" />
          <Route element={<Disputes_PAGE />} path="/disputes" />
          <Route element={<Disput_PAGE />} path="/disput/:id" />
          <Route element={<Transfers_PAGE />} path="/transfers" />
          <Route element={<Apps_PAGE />} path="/apps" />
          <Route element={<Musik_PAGE />} path="/musik" />
          <Route element={<Cash_PAGE />} path='/cash' />
          <Route element={<Chat_PAGE />} path='/chat' />
          <Route element={<Editprofile_PAGE />} path='/editprofile' />
          <Route element={<Follow_PAGE />} path='/follow/:id' />
          <Route element={<Offers_PAGE />} path='/offers' />
          <Route element={<Help_PAGE />} path='/help' />
          <Route element={<Razrabam_PAGE />} path='/razrabam' />
          <Route element={<Blog_PAGE />} path='/blog' />
          <Route element={<P404_PAGE />} path='*' />
          <Route element={<Leha_dr_PAGE />} path='/LEHAAAA' />
          <Route element={<Tech_PAGE />} path='/techwork' />

          <Route element={<News_PAGEE />} path="/dota" />
          <Route element={<Players_PAGE />} path='/dota/players' />
          <Route element={<Teams_PAGE />} path='/dota/teams' />
          <Route element={<Protokols_PAGE />} path='/dota/protokols' />
          <Route element={<Meetings_PAGE />} path='/dota/meetings' />
          <Route element={<Applications_PAGE />} path='/dota/meeting/applications'/>
          <Route element={<RegApplications_PAGE />} path='/dota/meeting/applications/reg' />
          <Route element={<Meeting_PAGE />} path='/dota/meeting/:id' />
          <Route element={<Team_PAGE />} path='/dota/team/:id' />
          <Route element={<Tournaments_PAGE />} path='/dota/tournaments' />
          <Route element={<Tournament_PAGE />} path='/dota/tournament/:id' />
          <Route element={<EdiTteam_PAGE />} path='/dota/editteam/:id' />
          <Route element={<EditStructure_PAGE />} path='/dota/editstructure/:id' />
          <Route element={<RegTeam_PAGE />} path='/dota/regteam/' />
          <Route element={<RegPlayer_PAGE />} path='/dota/regplayer/' />

          <Route element={<News_PAGEE_ />} path="/cs" />
          <Route element={<Players_PAGE_ />} path='/cs/players' />
          <Route element={<Teams_PAGE_ />} path='/cs/teams' />
          <Route element={<Protokols_PAGE_ />} path='/cs/protokols' />
          <Route element={<Meetings_PAGE_ />} path='/cs/meetings' />
          <Route element={<Applications_PAGE_ />} path='/cs/meeting/applications' />
          <Route element={<RegApplications_PAGE_ />} path='/cs/meeting/applications/reg' />
          <Route element={<Meeting_PAGE_ />} path='/cs/meeting/:id' />
          <Route element={<Team_PAGE_ />} path='/cs/team/:id' />
          <Route element={<Tournaments_PAGE_ />} path='/cs/tournaments' />
          <Route element={<Tournament_PAGE_ />} path='/cs/tournament/:id' />
          <Route element={<EdiTteam_PAGE_ />} path='/cs/editteam/:id' />
          <Route element={<EditStructure_PAGE_ />} path='/cs/editstructure/:id' />
          <Route element={<RegTeam_PAGE_ />} path='/cs/regteam/' />
          <Route element={<RegPlayer_PAGE_ />} path='/cs/regplayer/' />

          <Route element={<News_PAGEE__ />} path="/bascketball" />
          <Route element={<Players_PAGE__ />} path='/bascketball/players' />
          <Route element={<Teams_PAGE__ />} path='/bascketball/teams' />
          <Route element={<Protokols_PAGE__ />} path='/bascketball/protokols' />
          <Route element={<Meetings_PAGE__ />} path='/bascketball/meetings' />
          <Route element={<Applications_PAGE__ />} path='/bascketball/meeting/applications' />
          <Route element={<RegApplications_PAGE__ />} path='/bascketball/meeting/applications/reg' />
          <Route element={<Meeting_PAGE__ />} path='/bascketball/meeting/:id' />
          <Route element={<Team_PAGE__ />} path='/bascketball/team/:id' />
          <Route element={<Tournaments_PAGE__ />} path='/bascketball/tournaments' />
          <Route element={<Tournament_PAGE__ />} path='/bascketball/tournament/:id' />
          <Route element={<EdiTteam_PAGE__ />} path='/bascketball/editteam/:id' />
          <Route element={<EditStructure_PAGE__ />} path='/bascketball/editstructure/:id' />
          <Route element={<RegTeam_PAGE__ />} path='/bascketball/regteam/' />
          <Route element={<RegPlayer_PAGE__ />} path='/bascketball/regplayer/' />

        </Routes>
      </Context_A>
    </BrowserRouter>
  );
};

export default Router;