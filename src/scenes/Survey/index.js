import React, { useState, Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import * as S from './styles';

const MINIMUM_OPTIONS = 2;
const MAXIMUM_OPTIONS = 6;

const Survey = () => {
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

  const handleAddOption = (option) => {
    if (formSurvey.options.length === MAXIMUM_OPTIONS) {
      toast.error('The survey must have a maximum of 6 options');
      return;
    }
    setFormSurvey({ ...formSurvey, options: [...formSurvey.options, { id: formSurvey.options.length + 1, answer: '' }] });
  };

  return (
    <>
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
                          options: formSurvey.options.map((listOption) =>
                            listOption.id === option.id ? { ...listOption, answer: e.currentTarget.value } : listOption
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
              <Button variant="success" type="button">
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
