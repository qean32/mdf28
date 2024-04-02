import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./screens/regular/login";
import Profile from "./screens/regular/profile";
import News from "./screens/news/news";
import Poker from "./screens/news/poker";
import Community from "./screens/community/community";
import Disputes from "./screens/community/disputes";
import Transfers from "./screens/community/transfers";
import Apps from "./screens/community/apps";
import Musik from "./screens/regular/musik";
import Cash from "./screens/regular/cash";
import Chat from "./screens/regular/chat";
import Disput from "./screens/community/disput";
import Editprofile from "./screens/regular/edit_profile";
import Follow from "./screens/regular/follow";
import Offers from "./screens/regular/offers";

import { Context_A } from "./connections/context";

import Dota from "./screens/news/dota";
import Players_D from "./screens/directions/dota/players";
import Teams_D from "./screens/directions/dota/teams";
import Protokols_D from "./screens/directions/dota/protokols";
import Meetings_D from "./screens/directions/dota/meetings";
import Applications_D from "./screens/directions/dota/applications";
import RegApplications_D from "./screens/directions/dota/reg_applications";
import Meeting_D from "./screens/directions/dota/meeting";
import Team_D from "./screens/directions/dota/team";
import Tournament_D from "./screens/directions/dota/tournament";
import Tournaments_D from "./screens/directions/dota/tournaments";
import EdiTteam_D from "./screens/directions/dota/edit_team";
import RegTeam_D from "./screens/directions/dota/reg_team";
import RegPlayer_D from "./screens/directions/dota/reg_player";

import Cs from "./screens/news/cs";
import Players_C from "./screens/directions/cs/players";
import Teams_C from "./screens/directions/cs/teams";
import Protokols_C from "./screens/directions/cs/protokols";
import Meetings_C from "./screens/directions/cs/meetings";
import Applications_C from "./screens/directions/cs/applications";
import RegApplications_C from "./screens/directions/cs/reg_applications";
import Meeting_C from "./screens/directions/cs/meeting";
import Team_C from "./screens/directions/cs/team";
import Tournament_C from "./screens/directions/cs/tournament";
import Tournaments_C from "./screens/directions/cs/tournaments";
import EdiTteam_C from "./screens/directions/cs/edit_team";
import RegTeam_C from "./screens/directions/cs/reg_team";
import RegPlayer_C from "./screens/directions/cs/reg_player";

import Bascketball from "./screens/news/bascketball";
import Players_B from "./screens/directions/bascketball/players";
import Teams_B from "./screens/directions/bascketball/teams";
import Protokols_B from "./screens/directions/bascketball/protokols";
import Meetings_B from "./screens/directions/bascketball/meetings";
import Applications_B from "./screens/directions/bascketball/applications";
import RegApplications_B from "./screens/directions/bascketball/reg_applications";
import Meeting_B from "./screens/directions/bascketball/meeting";
import Team_B from "./screens/directions/bascketball/team";
import Tournament_B from "./screens/directions/bascketball/tournament";
import Tournaments_B from "./screens/directions/bascketball/tournaments";
import EdiTteam_B from "./screens/directions/bascketball/edit_team";
import RegTeam_B from "./screens/directions/bascketball/reg_team";
import RegPlayer_B from "./screens/directions/bascketball/reg_player";
import Help from "./screens/regular/help";
import Razrabam from "./screens/regular/razrabam";
import Blog from "./screens/regular/blog";
import Info from "./screens/regular/info";
import Page_404 from "./screens/regular/404.JSX";
import Leha_dr from "./screens/regular/leha";
const Router = () => {
  return (
    <BrowserRouter basename='/mdf28/'>
      <Context_A>
        <Routes>
          <Route element={<News />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<Profile />} path="/profile/:id" />
          <Route element={<Community />} path="/community" />
          <Route element={<Disputes />} path="/disputes" />
          <Route element={<Disput />} path="/disput/:id" />
          <Route element={<Transfers />} path="/transfers" />
          <Route element={<Apps />} path="/apps" />
          <Route element={<Musik />} path="/musik" />
          <Route element={<Cash />} path='/cash' />
          <Route element={<Chat />} path='/chat' />
          <Route element={<Editprofile />} path='/editprofile' />
          <Route element={<Follow />} path='/follow/:id' />
          <Route element={<Offers />} path='/offers' />
          <Route element={<Help />} path='/help' />
          <Route element={<Razrabam />} path='/razrabam' />
          <Route element={<Blog />} path='/blog' />
          <Route element={<Info />} path='/info' />
          <Route element={<Page_404 />} path='*' />
          <Route element={<Leha_dr />} path='/LEHAAAAAAAAAAA' />

          <Route element={<Dota />} path="/dota" />
          <Route element={<Players_D />} path='/dota/players' />
          <Route element={<Teams_D />} path='/dota/teams' />
          <Route element={<Protokols_D />} path='/dota/protokols' />
          <Route element={<Meetings_D />} path='/dota/meetings' />
          <Route element={<Applications_D />} path='/dota/meeting/applications' />
          <Route element={<RegApplications_D />} path='/dota/meeting/applications/reg' />
          <Route element={<Meeting_D />} path='/dota/meeting/:id' />
          <Route element={<Team_D />} path='/dota/team/:id' />
          <Route element={<Tournaments_D />} path='/dota/tournaments' />
          <Route element={<Tournament_D />} path='/dota/tournament/:id' />
          <Route element={<EdiTteam_D />} path='/dota/editteam/:id' />
          <Route element={<RegTeam_D />} path='/dota/regteam/' />
          <Route element={<RegPlayer_D />} path='/dota/regplayer/' />

          <Route element={<Cs />} path="/cs" />
          <Route element={<Players_C />} path='/cs/players' />
          <Route element={<Teams_C />} path='/cs/teams' />
          <Route element={<Protokols_C />} path='/cs/protokols' />
          <Route element={<Meetings_C />} path='/cs/meetings' />
          <Route element={<Applications_C />} path='/cs/meeting/applications' />
          <Route element={<RegApplications_C />} path='/cs/meeting/applications/reg' />
          <Route element={<Meeting_C />} path='/cs/meeting/:id' />
          <Route element={<Team_C />} path='/cs/team/:id' />
          <Route element={<Tournaments_C />} path='/cs/tournaments' />
          <Route element={<Tournament_C />} path='/cs/tournament/:id' />
          <Route element={<EdiTteam_C />} path='/cs/editteam/:id' />
          <Route element={<RegTeam_C />} path='/cs/regteam/' />
          <Route element={<RegPlayer_C />} path='/cs/regplayer/' />

          <Route element={<Poker />} path="/poker" />

          <Route element={<Bascketball />} path="/bascketball" />
          <Route element={<Players_B />} path='/bascketball/players' />
          <Route element={<Teams_B />} path='/bascketball/teams' />
          <Route element={<Protokols_B />} path='/bascketball/protokols' />
          <Route element={<Meetings_B />} path='/bascketball/meetings' />
          <Route element={<Applications_B />} path='/bascketball/meeting/applications' />
          <Route element={<RegApplications_B />} path='/bascketball/meeting/applications/reg' />
          <Route element={<Meeting_B />} path='/bascketball/meeting/:id' />
          <Route element={<Team_B />} path='/bascketball/team/:id' />
          <Route element={<Tournaments_B />} path='/bascketball/tournaments' />
          <Route element={<Tournament_B />} path='/bascketball/tournament/:id' />
          <Route element={<EdiTteam_B />} path='/bascketball/editteam/:id' />
          <Route element={<RegTeam_B />} path='/bascketball/regteam/' />
          <Route element={<RegPlayer_B />} path='/bascketball/regplayer/' />

        </Routes>
      </Context_A>
    </BrowserRouter>
  );
};

export default Router;