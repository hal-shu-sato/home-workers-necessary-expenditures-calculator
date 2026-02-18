'use client';

import { useState } from 'react';

import {
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from '@mui/material';

function calculateMinimumEmploymentIncomeDeduction(year: number) {
  if (year >= 2025) {
    return 650000;
  }
  if (year >= 2020) {
    return 550000;
  }
  return 650000;
}

export default function Calculator() {
  const [year, setYear] = useState(2025);
  const [businessIncome, setBusinessIncome] = useState('');
  const [businessExpenses, setBusinessExpenses] = useState('');
  const [miscellaneousIncome, setMiscellaneousIncome] = useState('');
  const [employmentIncome, setEmploymentIncome] = useState('');

  const minimumEmploymentIncomeDeduction =
    calculateMinimumEmploymentIncomeDeduction(year);

  const businessNecessaryExpenses = Math.max(
    0,
    minimumEmploymentIncomeDeduction -
      Number(miscellaneousIncome || 0) -
      Number(employmentIncome || 0),
  );

  const miscellaneousNecessaryExpenses = Math.max(
    0,
    minimumEmploymentIncomeDeduction -
      Number(businessIncome || 0) -
      Number(employmentIncome || 0),
  );

  return (
    <Container component="main" fixed>
      <h1>
        家内労働者等の事業所得等の所得計算の特例の適用を受ける場合の必要経費の額の計算書
      </h1>

      <Stack spacing={2} sx={{ mb: 2 }}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Stack spacing={2}>
            <h2>計算する年分</h2>
            <FormControl>
              <InputLabel id="year-label">年分</InputLabel>
              <Select
                labelId="year-label"
                id="year"
                label="年分"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              >
                <MenuItem value={2025}>令和7（2025）年分以降</MenuItem>
                <MenuItem value={2020}>
                  令和2（2020）年分から令和6（2024）年分
                </MenuItem>
                <MenuItem value={1988}>平成31（2019）年分以前</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Paper>

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
              id="employment-income"
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
              value={employmentIncome}
              onChange={(e) => setEmploymentIncome(e.target.value)}
            />
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ p: 2 }}>
          <Stack spacing={2}>
            <h2>特例必要経費</h2>
            <TextField
              id="business-necessary-expenses"
              label={`${minimumEmploymentIncomeDeduction / 10000}万円 - ② - ④`}
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
              label={`${minimumEmploymentIncomeDeduction / 10000}万円 - ③ - ④`}
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
                Number(miscellaneousIncome || 0) === 0 ||
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
