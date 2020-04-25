import i18next from 'i18next';
import React from 'react';

const Settings = (props) => {
  const { showModal } = props;
  return (
    <div className="mt-4">
      <h5 className="d-flex">{i18next.t('settings')}</h5>
      <button onClick={() => showModal('userName')} className="btn btn-info m-1 w-100 center-block">{i18next.t('userNameButton')}</button>
    </div>
  );
};

export default Settings;
