import React, { useState, Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import Loader from '../../components/Loader';
import { actions as surveyActions } from '../../reducers/survey';
import * as S from './styles';

const MINIMUM_OPTIONS = 2;
const MAXIMUM_OPTIONS = 6;

const Survey = () => {
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.survey.isFetching);
  const [formSurvey, setFormSurvey] = useState({
    title: '',
    description: '',
    options: [
      { id: 1, answer: '' },
      { id: 2, answer: '' },
    ],
  });

  const handleInputChange = (name, value) => {
    setFormSurvey({ ...formSurvey, [name]: value });
  };

  const handleRemoveOption = (option) => {
    if (formSurvey.options.length === MINIMUM_OPTIONS) {
      toast.error('The survey must have at least 2 options');
      return;
    }
    setFormSurvey({
      ...formSurvey,
      options: formSurvey.options
        .filter((optionList) => optionList.id !== option.id)
        .map((optionList, index) => ({ ...optionList, id: index + 1 })),
    });
  };

  const handleAddOption = () => {
    if (formSurvey.options.length === MAXIMUM_OPTIONS) {
      toast.error('The survey must have a maximum of 6 options');
      return;
    }
    setFormSurvey({ ...formSurvey, options: [...formSurvey.options, { id: formSurvey.options.length + 1, answer: '' }] });
  };

  const onHandleSubmit = () => {
    const errors = [];
    if (!formSurvey.title) {
      errors.push('title');
    }
    if (!formSurvey.description) {
      errors.push('description');
    }
    formSurvey.options.map((option, index) => {
      if (!option.answer) {
        errors.push(`option ${index + 1}`);
      }
    });
    if (errors.length) {
      toast.error(`Please fill the remaining empty fields: ${errors.join(',')}`);
      return;
    }
    dispatch(surveyActions.createRequest(formSurvey));
  };

  return (
    <>
      {isFetching && <Loader />}
      <S.Box>
        <S.Title>New survey</S.Title>
        <S.DivForm>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title of the survey"
                maxLength={50}
                onChange={(e) => handleInputChange('title', e.currentTarget.value)}
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Give a nice description for your survey"
                maxLength={100}
                onChange={(e) => handleInputChange('description', e.currentTarget.value)}
              />
            </Form.Group>
            <Form.Group controlId="formOptions">
              <Form.Label>Options</Form.Label>
              {formSurvey.options.map((option, index) => (
                <Fragment key={option.id}>
                  <S.DivOption>
                    <Form.Control
                      type="text"
                      placeholder={`Option ${index + 1}`}
                      maxLength={25}
                      value={option.answer}
                      onChange={(e) =>
                        setFormSurvey({
                          ...formSurvey,
                          options: formSurvey.options.map((opt) =>
                            opt.id === option.id ? { ...opt, answer: e.currentTarget.value } : opt
                          ),
                        })
                      }
                    />
                    <S.RemoveOption onClick={() => handleRemoveOption(option)}>X</S.RemoveOption>
                  </S.DivOption>
                  <br />
                </Fragment>
              ))}
              <Button variant="primary" type="button" onClick={handleAddOption}>
                Add option
              </Button>
            </Form.Group>
            <S.DivSubmit>
              <Button variant="success" type="button" onClick={onHandleSubmit}>
                Submit
              </Button>
            </S.DivSubmit>
          </Form>
        </S.DivForm>
      </S.Box>
    </>
  );
};

export default Survey;