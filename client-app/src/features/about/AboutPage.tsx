import {
    Alert,
    AlertTitle,
    Button,
    ButtonGroup,
    Container,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";
import { useState } from "react";
import agent from "../../app/api/agent";

export default function AboutPage() {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    function getValidationError() {
        agent.TestErrors.getValidationError()
            .then(() => console.log("no see"))
            .catch((error) => setValidationErrors(error));
    }

    return (
        <Container>
            <Typography gutterBottom variant="h2">
                Eror testing page
            </Typography>
            <ButtonGroup fullWidth>
                <Button
                    variant="contained"
                    onClick={() =>
                        agent.TestErrors.get400error().catch((error) =>
                            console.log(error)
                        )
                    }
                >
                    Test 400 Error
                </Button>
                <Button
                    variant="contained"
                    onClick={() =>
                        agent.TestErrors.get401error().catch((error) =>
                            console.log(error)
                        )
                    }
                >
                    Test 401 Error
                </Button>
                <Button
                    variant="contained"
                    onClick={() =>
                        agent.TestErrors.get404error().catch((error) =>
                            console.log(error)
                        )
                    }
                >
                    Test 404 Error
                </Button>
                <Button
                    variant="contained"
                    onClick={() =>
                        agent.TestErrors.get500error().catch((error) =>
                            console.log(error)
                        )
                    }
                >
                    Test 500 Error
                </Button>
                <Button variant="contained" onClick={getValidationError}>
                    Test Validation Error
                </Button>
            </ButtonGroup>
            {validationErrors.length > 0 && (
                <Alert severity="error">
                    <AlertTitle>Validation errors</AlertTitle>
                    <List>
                        {validationErrors.map((error) => (
                            <ListItem key={error}>
                                <ListItemText>{error}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Alert>
            )}
        </Container>
    );
}
