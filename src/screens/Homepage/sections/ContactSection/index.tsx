import React, { useContext, useEffect, useRef, useState } from 'react';
import { Components } from './styled';
import MailIcon from '@mui/icons-material/Mail';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import Button from '@mui/material/Button';
import { COLORS } from '../../../../styled';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import { SiteLanguageContext } from '../../../../providers/siteLanguage/context';
import emailjs from '@emailjs/browser';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const image = require('../../../../assets/BooksImage.jpg');

const ContactSection = () => {
  const { isRo } = useContext(SiteLanguageContext);

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [showNameErr, setShowNameErr] = useState(false);
  const [showPhoneErr, setShowPhoneErr] = useState(false);
  const [showEmailErr, setShowEmailErr] = useState(false);

  const [nameErrMessage, setNameErr] = useState('');
  const [phoneErrMessage, setPhoneErr] = useState('');
  const [emailErrMessage, setEmailErr] = useState('');

  const [showSuccessSend, setShowSuccessSend] = useState(false);
  const [showAPIErr, setShowAPIErr] = useState(false);

  const onChangeName = (e: any) => {
    setName(e.target.value);
    setShowNameErr(false);
    setNameErr('');
  };
  console.log(name, 'name ourside');

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
    setShowEmailErr(false);
    setEmailErr('');
  };

  const onChangePhone = (e: any) => {
    setShowPhoneErr(false);
    setPhoneErr('');
    setPhoneNumber(e.target.value);
  };

  const onChangeDetails = (e: any) => {
    setDetails(e.target.value);
  };

  const checkForErrors = () => {
    let isErr = false;
    if (!name.trim()) {
      isErr = true;
      setShowNameErr(true);
      const err = isRo ? 'Acest câmp este obligatoriu' : 'This field is mandatory';
      setNameErr(err);
    } else if (name.trim().length < 4) {
      isErr = true;
      setShowNameErr(true);
      const err = isRo ? 'Vă rugăm introduceți un nume valid' : 'Please insert a valid name';
      setNameErr(err);
    }
    if (!phoneNumber.trim()) {
      isErr = true;
      setShowPhoneErr(true);
      const err = isRo ? 'Acest câmp este obligatoriu' : 'This field is mandatory';
      setPhoneErr(err);
    } else if (phoneNumber.trim().length < 10) {
      isErr = true;
      setShowPhoneErr(true);
      const err = isRo ? 'Vă rugăm introduceți un număr valid' : 'Please insert a valid number';
      setPhoneErr(err);
    }
    if (!email || (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))) {
      isErr = true;
      setShowEmailErr(true);
      const err = isRo ? 'Vă rugăm introduceți un email valid' : 'Please insert a valid email';
      setEmailErr(err);
    }
    return isErr;
  };

  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      const timer = setTimeout(() => {
        setShowSuccessSend(false);
        setShowAPIErr(false);
        setName('');
        setPhoneNumber('');
        setEmail('');
        setDetails('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessSend, showAPIErr]);

  const onHandleSubmit = (e: any) => {
    e.preventDefault();
    const isErr = checkForErrors();
    if (isErr) {
      return;
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      emailjs
        .send('service_uvo934r', 'template_numb9h8', { name, phoneNumber, email, details }, 'fKQevxMbzGmNtuRK7')
        .then(
          (result) => {
            setShowSuccessSend(true);
          },
          (error) => {
            console.log(error.text);
            setShowAPIErr(true);
          },
        );
    }
  };

  return (
    <>
      <Components.Container id={'contact'}>
        <Components.ContactMessage>
          <Components.BackgroundImage src={image} />
          <Components.CTAWrapper>
            <Components.CTAText>
              {isRo ? 'Ai nevoie de un partener de încredere' : 'Looking for a reliable partner'}?
            </Components.CTAText>
            <Components.CTAText>{isRo ? 'Contactează-ne' : 'Contact us'}!</Components.CTAText>
          </Components.CTAWrapper>
          <>
            <Components.TextWrapper>
              <PhoneInTalkIcon />
              <Components.Text>+40722697542</Components.Text>
            </Components.TextWrapper>
            <Components.TextWrapper>
              <MailIcon />
              <Components.Text onClick={() => window.open('mailto:alexandru.nuta@gmail.com')}>
                alexandru.nuta@gmail.com
              </Components.Text>
            </Components.TextWrapper>
          </>
        </Components.ContactMessage>
        {showSuccessSend ? (
          <Components.MessageWrapper>
            <Components.Message>
              {isRo ? 'Mesajul a fost trimis cu succes!' : ' Your message was successfully sent'}
            </Components.Message>
            <MarkEmailReadOutlinedIcon font-size={'large'} style={{ color: COLORS.textColor }} />
          </Components.MessageWrapper>
        ) : showAPIErr ? (
          <Components.MessageWrapper>
            <Components.Message>
              {isRo
                ? 'Eroare la trimitere mesaj. Vă rugăm încercați mai târziu'
                : ' An error hash occurred. Please try again later'}
            </Components.Message>
            <MarkEmailReadOutlinedIcon font-size={'large'} style={{ color: COLORS.textColor }} />
          </Components.MessageWrapper>
        ) : (
          <Components.ContactForm>
            <Box
              component='form'
              sx={{
                '& .MuiTextField-root': {
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  width: '100%',
                  alignItem: 'flex-start',
                  marginBottom: 2,
                },
              }}
              autoComplete='off'
              noValidate>
              <form>
                <TextField
                  error={showNameErr}
                  id='standard-error-helper-text'
                  label={isRo ? 'Nume și prenume' : 'Name'}
                  defaultValue={name}
                  helperText={nameErrMessage}
                  variant='standard'
                  type={'text'}
                  name='user_name'
                  onChange={onChangeName}
                  autoComplete='off'
                />
                <TextField
                  error={showPhoneErr}
                  id='standard-error-helper-text'
                  label={isRo ? 'Telefon' : 'Phone number'}
                  defaultValue={phoneNumber}
                  helperText={phoneErrMessage}
                  variant='standard'
                  onChange={onChangePhone}
                  name='user_phone'
                  autoComplete='off'
                />
                <TextField
                  error={showEmailErr}
                  id='standard-error-helper-text'
                  label='Email'
                  defaultValue={email}
                  helperText={emailErrMessage}
                  variant='standard'
                  onChange={onChangeEmail}
                  type={'email'}
                  name='user_email'
                  autoComplete='off'
                />
                <TextareaAutosize
                  defaultValue={details}
                  onChange={onChangeDetails}
                  minRows={4}
                  aria-label='maximum height'
                  style={{
                    backgroundColor: COLORS.lightBrown,
                    width: '100%',
                    borderWidth: 0.5,
                    borderColor: COLORS.darkBrown,
                    fontFamily: 'Roboto',
                    fontSize: 16,
                  }}
                  name='user_message'
                />
                <div style={{ display: 'flex', width: '100%', marginTop: 16 }}>
                  <Button
                    variant='contained'
                    size='medium'
                    type='button'
                    sx={{
                      'backgroundColor': COLORS.darkBrown,
                      'justify-content': 'center',
                      'flex': 1,
                      'padding': 2,
                      'align-items': 'start',
                      'font-weight': 'bold',
                      'font-family': 'Open Sans',
                      '&: hover': {
                        backgroundColor: COLORS.textColor,
                      },
                    }}
                    onClick={onHandleSubmit}>
                    {isRo ? 'Trimite' : 'Submit'}
                  </Button>
                </div>
              </form>
            </Box>
          </Components.ContactForm>
        )}
      </Components.Container>
    </>
  );
};

export default ContactSection;
