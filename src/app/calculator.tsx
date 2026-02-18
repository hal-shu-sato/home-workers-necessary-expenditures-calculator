'use client';

import { useState } from 'react';

import {
  Container,
  InputAdornment,
  Paper,
  Stack,
  TextField,
} from '@mui/material';

export default function Calculator() {
  const [businessIncome, setBusinessIncome] = useState('');
  const [businessExpenses, setBusinessExpenses] = useState('');
  const [miscellaneousIncome, setMiscellaneousIncome] = useState('');
  const [salaryIncome, setSalaryIncome] = useState('');

  const businessNecessaryExpenses = Math.max(
    0,
    650000 - Number(miscellaneousIncome || 0) - Number(salaryIncome || 0),
  );

  const miscellaneousNecessaryExpenses = Math.max(
    0,
    650000 - Number(businessIncome || 0) - Number(salaryIncome || 0),
  );

  return (
    <Container component="main" fixed>
      <h1>
        家内労働者等の事業所得等の所得計算の特例の適用を受ける場合の必要経費の額の計算書
      </h1>

      <Stack spacing={2} sx={{ mb: 2 }}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Stack spacing={2}>
            <h2>事業所得</h2>
            <TextField
              id="business-income"
              label="総収入金額"
              helperText="各種引当金・準備金等の繰戻額等の金額を含めて書きます。"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">①</InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">円</InputAdornment>
                  ),
                },
              }}
              value={businessIncome}
              onChange={(e) => setBusinessIncome(e.target.value)}
            />
            <TextField
              id="business-expenses"
              label="特例適用前の必要経費の額"
              helperText="「家内労働者等の事業所得等の所得計算の特例」を適用する前の必要経費の額（青色申告特別控除額は含みません。）を書きます。"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">②</InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">円</InputAdornment>
                  ),
                },
              }}
              value={businessExpenses}
              onChange={(e) => setBusinessExpenses(e.target.value)}
            />

            <h2>雑所得</h2>
            <TextField
              id="miscellaneous-income"
              label="総収入金額"
              helperText="公的年金等に係るものを除きます。"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">③</InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">円</InputAdornment>
                  ),
                },
              }}
              value={miscellaneousIncome}
              onChange={(e) => setMiscellaneousIncome(e.target.value)}
            />

            <h2>給与所得</h2>
            <TextField
              id="salary-income"
              label="給与所得の収入金額"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">④</InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">円</InputAdornment>
                  ),
                },
              }}
              value={salaryIncome}
              onChange={(e) => setSalaryIncome(e.target.value)}
            />
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2 }}>
          <Stack spacing={2}>
            <h2>特例必要経費</h2>
            <TextField
              id="business-necessary-expenses"
              label="65万円 - ② - ④"
              helperText="赤字のときは0"
              slotProps={{
                input: {
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">⑤</InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">円</InputAdornment>
                  ),
                },
              }}
              value={businessNecessaryExpenses}
            />
            <TextField
              id="miscellaneous-necessary-expenses"
              label="65万円 - ③ - ④"
              helperText="赤字のときは0"
              slotProps={{
                input: {
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">⑥</InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">円</InputAdornment>
                  ),
                },
              }}
              value={miscellaneousNecessaryExpenses}
            />
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2 }}>
          <Stack spacing={2}>
            <h2>特例適用後の必要経費の額</h2>

            <h3>事業所得</h3>

            <h4>③がない場合 または ③が⑤より少ないか同額の場合</h4>
            <TextField
              id="business-necessary-expenses-after-special-case"
              label="①と⑥とのいずれか少ない方の金額"
              slotProps={{
                input: {
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">⑦</InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">円</InputAdornment>
                  ),
                },
              }}
              value={Math.min(
                Number(businessIncome || 0),
                miscellaneousNecessaryExpenses,
              )}
              disabled={
                Number(miscellaneousIncome || 0) > businessNecessaryExpenses
              }
            />

            <h4>③が⑤より多い場合</h4>
            <TextField
              id="business-necessary-expenses-after-special-case-2"
              label="②の金額"
              slotProps={{
                input: {
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">⑧</InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">円</InputAdornment>
                  ),
                },
              }}
              value={businessExpenses || 0}
              disabled={
                !miscellaneousIncome ||
                Number(miscellaneousIncome || 0) <= businessNecessaryExpenses
              }
            />

            <h3>雑所得</h3>
            <TextField
              id="miscellaneous-necessary-expenses-after-special-case"
              label="③と⑥とのいずれか少ない方の金額"
              slotProps={{
                input: {
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">⑨</InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">円</InputAdornment>
                  ),
                },
              }}
              value={Math.min(
                Number(miscellaneousIncome || 0),
                miscellaneousNecessaryExpenses,
              )}
            />
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
