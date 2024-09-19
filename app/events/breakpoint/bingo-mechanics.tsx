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
                <ListItem>
                  Follow the instructions on each slot to snap photos with the
                  UnBlink App! Each 3 slots in a Row/Column/Diagonal completed
                  earns you 1 point.
                </ListItem>
              </List>
            </MechanicsBody>
          </Stack>

          <Stack>
            <MechanicsTitle>Maximum Score</MechanicsTitle>
            <MechanicsBody>
              <List>
                <ListItem>
                  The maximum score is 8 points, representing 8 possible Bingo
                  combinations on the 3x3 card.
                </ListItem>
              </List>
            </MechanicsBody>
          </Stack>

          <Stack>
            <MechanicsTitle>Blackout Medal</MechanicsTitle>
            <MechanicsBody>
              <List>
                <ListItem>
                  Completing all 9 slots (a &apos;blackout&apos;) earns the
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
                  After the event, prizes are raffled based on the number of
                  points players have accumulated.
                </ListItem>
                <ListItem>
                  A raffle entry multiplier is given for all players who earned
                  a Blackout Medal, meaning 9 maximum points multiplied twice
                  grants those who achieved a blackout medal gets a total of 18
                  points/raffle entries!
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
