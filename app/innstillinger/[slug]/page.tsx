import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

/*const ProfileTemplate: React.FC = () => {
  return (
    <div className="container light-style flex-grow-1 container-p-y">
      <h4 className="font-weight-bold py-3 mb-4">
        Account settings
      </h4>
      <div className="card overflow-hidden">
        <div className="row no-gutters row-bordered row-border-light">
          <div className="col-md-3 pt-0">
            <div className="list-group list-group-flush account-settings-links">
              <a className="list-group-item list-group-item-action active" data-toggle="list" href="#account-general">General</a>
              <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-change-password">Change password</a>
              <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-info">Info</a>
              <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-social-links">Social links</a>
              <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-connections">Connections</a>
              <a className="list-group-item list-group-item-action" data-toggle="list" href="#account-notifications">Notifications</a>
            </div>
          </div>
          <div className="col-md-9">
            <div className="tab-content">
              <div className="tab-pane fade active show" id="account-general">
                {/* Rest of your HTML content for this tab }
              </div>
              <div className="tab-pane fade" id="account-change-password">
                {/* Rest of your HTML content for this tab }
              </div>
              {/* Add more tab panes as needed }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileTemplate;*/

/*
Spør om hvor knappen for routing til profil mappen ligger i prosjektet, eller hvor jeg skal legge den.
se på bildet zekima sendte på discord!
*/


/*const ProfileTemplate: React.FC = () => {
  return (
    <div className="container max-w-screen-xl bg-gray-100 py-8">
      <h4 className="font-bold text-lg mb-8">Account settings</h4>
      <div className="card bg-white overflow-hidden border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4">
          <div className="col-span-1 md:col-span-2">
          <div className="flex flex-col h-full space-y-4">
            <a className="list-group-item list-group-item-action active mb-2" href="#account-general">General</a>
            <a className="list-group-item list-group-item-action mb-2" href="#account-change-password">Change password</a>
            <a className="list-group-item list-group-item-action mb-2" href="#account-info">Info</a>
            <a className="list-group-item list-group-item-action mb-2" href="#account-social-links">Social links</a>
            <a className="list-group-item list-group-item-action mb-2" href="#account-connections">Connections</a>
            <a className="list-group-item list-group-item-action mb-2" href="#account-notifications">Notifications</a>
            </div>
          </div>
          <div className="col-span-1 md:col-span-1">
            <div className="tab-content">
              <div className="tab-pane fade active show" id="account-general">
                {/* Rest of your HTML content for this tab }
              </div>
              <div className="tab-pane fade" id="account-change-password">
                {/* Rest of your HTML content for this tab }
              </div>
              {/* Add more tab panes as needed }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileTemplate;*/


/*import './random.css'; // Import your CSS file

const ProfilePage: React.FC = () => {
  return (
        <div className="row">
          <div className="col-md-4 mt-1">
            <div className="card text-center sidebar">
              <div className="card-body">
              <img src="/avatar-male.jpg" className="rounded-circle" width="150" alt="Profile Image" />                <div className="mt-3">
                  <h3>Yusuf salad Yusuf</h3>
                  <a href="">Hjem</a>
                  <a href="">Kontakt Oss</a>
                  <a href="">hjelp</a>
                  <a href="">Instillinger</a>
                  <a href="">log tt</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8 mt-1">
            <div className="card mb-3 content">
              <h1 className="m-3 pt-3">OM</h1>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">
                    <h5>Fullt Navn</h5>
                  </div>
                  <div className="col-md-9 text-secondary">
                    Yusuf Salad Yusuf
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-3">
                    <h5>Email</h5>
                  </div>
                  <div className="col-md-9 text-secondary">
                    abc@gmail.com
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-3">
                    <h5>Mobil</h5>
                  </div>
                  <div className="col-md-9 text-secondary">
                    934 54 112
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-3">
                    <h5>Adresse</h5>
                  </div>
                  <div className="col-md-9 text-secondary">
                    oppihimmelen 61D
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-3 content m-3">
              <h1>Siste Dugnader</h1>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-9">
                    <h5>Prosjekt Navn</h5>
                  </div>
                  <div className="col-md-3 text-secondary">
                    Prosjekt Forklaring
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}

export default ProfilePage;*/
//<div className="card text-center sidebar bg-green-400" style={{ height: '600px',  marginTop: '0px'  }}>
//<div className="card text-center sidebar gap-y-20 bg-green-400 max-h-[800px] gap-y-20">
//<div className="col-md-4 mt-1 bg-green-400 sidebar text-center">

const settingsPage: React.FC = () => {
    return (
      <div className="row">
        <div className="card text-center sidebar bg-green-400 " style={{backgroundColor: '#48bb78', height: '520px', width: '500px', marginTop: '20px' }}>
            <div className="card-body">
              <img src="/avatar-male.jpg" className="rounded-circle w-40 mx-auto" alt="Profile Image" />
              <div className="mt-3">
                <h3 className="text-lg">Yusuf salad Yusuf</h3>
                <Link href="/" className="block mt-4">Hjem</Link>
                <Link href="" className="block">Kontakt Oss</Link>
                <Link href="" className="block">Hjelp</Link>
                <Link href="" className="block">Instillinger</Link>
                <Link href="" className="block">Logg Ut</Link>
            </div>
          </div>
        </div>
        <div className="col-md-8 mt-1">
          <div className="card mb-3 content m-3 bg-gray-200">
            <h1 className="m-3 pt-3">OM</h1>
            <div className="card-body">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h5>Fullt Navn</h5>
                </div>
                <div className="col-span-2 text-secondary">
                  Yusuf Salad Yusuf
                </div>
              </div>
              <hr />
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h5>Email</h5>
                </div>
                <div className="col-span-2 text-secondary">
                  abc@gmail.com
                </div>
              </div>
              <hr />
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h5>Mobil</h5>
                </div>
                <div className="col-span-2 text-secondary">
                  934 54 112
                </div>
              </div>
              <hr />
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h5>Adresse</h5>
                </div>
                <div className="col-span-2 text-secondary">
                  oppihimmelen 61D
                </div>
              </div>
            </div>
          </div>
          <div className="card mb-3 content m-3 bg-gray-200">
            <h1 className="m-3">Siste Dugnader</h1>
            <div className="card-body">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <h5>Prosjekt Navn</h5>
                </div>
                <div className="text-secondary">
                  Prosjekt Forklaring
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default settingsPage;
  //<div className="card text-center sidebar bg-green-500 text-white">
  //<Link href="/innstillinger"></Link>

