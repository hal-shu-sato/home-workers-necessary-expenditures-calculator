'use client';

import { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

export default function DisclaimerDialog() {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="disclaimer-dialog-title"
      aria-describedby="disclaimer-dialog-description"
    >
      <DialogTitle id="disclaimer-dialog-title">免責事項</DialogTitle>
      <DialogContent>
        <DialogContentText id="disclaimer-dialog-description">
          <List>
            <ListItem>
              <ListItemText primary="本ツールは所得税法および租税特別措置法に基づき、家内労働者等の事業所得等の所得計算の特例の適用を受ける場合の必要経費の額を計算するものです。" />
            </ListItem>
            <ListItem>
              <ListItemText primary="計算結果の正確性については万全を期しておりますが、これを保証するものではありません。" />
            </ListItem>
            <ListItem>
              <ListItemText primary="本ツールは、利用者が「家内労働者等」の定義に合致することを前提としています。ご自身が対象に含まれるかどうかの最終的な判断は、管轄の税務署または税理士にご確認ください。" />
            </ListItem>
            <ListItem>
              <ListItemText primary="本ツールの利用により生じた直接的・間接的な損害（申告漏れ、過少申告、追徴課税等）について、開発者は一切の責任を負いません。" />
            </ListItem>
            <ListItem>
              <ListItemText primary="本ツールは個別の事案に対する税務相談や税務書類の作成を目的としたものではありません。" />
            </ListItem>
            <ListItem>
              <ListItemText primary="実際の申告に際しては、必ず国税庁HPをご確認いただき、税務署や税理士にご相談ください。" />
            </ListItem>
          </List>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          同意する
        </Button>
      </DialogActions>
    </Dialog>
  );
}
