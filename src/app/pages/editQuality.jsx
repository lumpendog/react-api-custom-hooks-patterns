import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
// import { toast } from 'react-toastify';
import QualityForm from '../components/ui/qualityForm';
import { useQualities } from '../hooks/useQualities';

const EditQualityPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const { getQuality, updateQuality } = useQualities();

  const quality = getQuality(id);

  const handleSubmit = (data) => {
    updateQuality(data).then((data) => {
      if (data) history.push('/');
    });
  };

  return (
    <>
      <h1>Edit Quality Page</h1>
      <QualityForm data={quality} onSubmit={handleSubmit} />
    </>
  );
};

export default EditQualityPage;
