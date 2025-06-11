import OpenAI from 'openai';
import {OPENAPI_KEY} from './Constant'

const client = new OpenAI({
  apiKey: OPENAPI_KEY,
  dangerouslyAllowBrowser: true,
});

export default client;
