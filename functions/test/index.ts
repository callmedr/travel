import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { GoogleGenAI } from 'npm:@google/genai';
import process from 'node:process';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

console.log('Edge function "test" is running');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { question, context } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY가 환경 변수에 설정되지 않았습니다.');
    }
    
    if (!question) {
      throw new Error('질문이 필요합니다.');
    }
    
    if (!context) {
      throw new Error('문맥 정보가 필요합니다.');
    }

    const ai = new GoogleGenAI({ apiKey });

    const modelPrompt = `당신은 명랑하고 지식이 풍부한 여행 가이드입니다. 제공된 관광 명소에 대한 문맥 정보를 바탕으로 사용자의 질문에 한국어로 답변해주세요. 친절하고 도움이 되는 방식으로, 웹을 꼼꼼히 탐색하여 매우 자세하고 정확한 답변을 제공해야 합니다. 답변은 문장 단위로 줄바꿈(\n)을 포함하여 가독성 좋게 작성해주세요.

명소에 대한 문맥 정보:
---
${context}
---

사용자의 질문:
---
${question}
---
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: modelPrompt,
      config: {
        tools: [{googleSearch: {}}],
      },
    });

    const answer = response.text;

    return new Response(JSON.stringify({ answer }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Edge Function 오류:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
