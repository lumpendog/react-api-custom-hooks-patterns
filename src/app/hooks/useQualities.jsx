import React, { useContext, useEffect, useState } from 'react';
import qualityService from '../services/quality.service';
import { toast } from 'react-toastify';

const QualitiesContext = React.createContext();

export const useQualities = () => {
  return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getQualities = async () => {
      try {
        const { content } = await qualityService.fetchAll();
        setQualities(content);
        setIsLoading(false);
      } catch (e) {
        errorCatcher(e);
      }
    };
    getQualities();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const getQuality = (id) => {
    return qualities.find((q) => q._id === id);
  };

  const updateQuality = async ({ _id: id, ...data }) => {
    try {
      const { content } = await qualityService.update(id, data);
      setQualities((prevState) =>
        prevState.map((item) => {
          if (item._id === content._id) {
            return content;
          }
          return item;
        })
      );
      return content;
    } catch (e) {
      errorCatcher(e);
    }
  };

  const addQuality = async (data) => {
    try {
      const { content } = await qualityService.create(data);
      setQualities((prevState) => [...prevState, content]);
      return content;
    } catch (e) {
      errorCatcher(e);
    }
  };

  const deleteQuality = async (id) => {
    try {
      const { content } = await qualityService.delete(id);
      setQualities((prevState) =>
        prevState.filter((q) => q._id !== content._id)
      );
      return content;
    } catch (e) {
      errorCatcher(e);
    }
  };

  function errorCatcher(e) {
    const { message } = e.response.data;
    setError(message);
  }

  return (
    <QualitiesContext.Provider
      value={{
        qualities,
        getQuality,
        updateQuality,
        addQuality,
        deleteQuality,
      }}
    >
      {!isLoading ? children : <h1>Qualities are loading...</h1>}
    </QualitiesContext.Provider>
  );
};
