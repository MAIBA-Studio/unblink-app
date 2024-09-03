"use client";

import { OutlineButton } from "@/components";
import { Checklist as ChecklistIcon } from "@mui/icons-material";
import {
  List as BaseList,
  ListItem as BaseListItem,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

const List = styled(BaseList)(({ theme }) => ({
  listStyle: "disc",
}));

const ListItem = styled(BaseListItem)(({ theme }) => ({
  paddingTop: 0,
}));

const MechanicsTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.base.md,
  color: theme.palette.neutral[80],
}));

const MechanicsBody = styled(Stack)(({ theme }) => ({
  ...theme.typography.base.sm,
  color: theme.palette.neutral[60],
}));

export const BingoMechanics = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleToggleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Box width={"100%"}>
        <OutlineButton
          preset="green"
          sx={{
            width: "100%",
          }}
          startIcon={<ChecklistIcon />}
          onClick={handleToggleOpen}
        >
          Read Mechanics
        </OutlineButton>
      </Box>

      <Dialog
        open={open}
        onClose={handleToggleOpen}
        sx={{
          "& .MuiDialog-paper": {
            background: theme.palette.neutral[20],
          },
        }}
      >
        <DialogTitle color={theme.palette.warning.dark}>
          Bingo Mechanics
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack>
            <MechanicsTitle>Scoring</MechanicsTitle>
            <MechanicsBody>
              <List>
                <ListItem>Row/Column/Diagonal Completion.</ListItem>
                <ListItem>
                  Completing 5 slots in a row, column, or diagonal earns the
                  player 1 point.
                </ListItem>
              </List>
            </MechanicsBody>
          </Stack>

          <Stack>
            <MechanicsTitle>Maximum Score</MechanicsTitle>
            <MechanicsBody>
              <List>
                <ListItem>
                  The maximum score is 12 points, representing 12 possible Bingo
                  combinations on the 5x5 card.
                </ListItem>
              </List>
            </MechanicsBody>
          </Stack>

          <Stack>
            <MechanicsTitle>Blackout Medal</MechanicsTitle>
            <MechanicsBody>
              <List>
                <ListItem>
                  Completing all 25 slots (a &apos;blackout&apos;) earns the
                  player a special Blackout Medal.
                </ListItem>
              </List>
            </MechanicsBody>
          </Stack>

          <Stack>
            <MechanicsTitle>Post-Event Prizes</MechanicsTitle>
            <MechanicsBody>
              <List>
                <ListItem>
                  After the event, prizes are distributed based on the number of
                  points players have accumulated.
                </ListItem>
                <ListItem>
                  A special raffle is held for all players who earned a Blackout
                  Medal, with additional prizes awarded.
                </ListItem>
              </List>
            </MechanicsBody>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleToggleOpen}
            sx={{
              color: theme.palette.warning.dark,
              textTransform: "uppercase",
            }}
          >
            Got it!
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
