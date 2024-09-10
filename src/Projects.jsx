import React, {useState, useEffect} from "react";
import {ref, get, set} from "firebase/database";
import {Box, Button, ButtonGroup, IconButton, Icon, Card, CardContent, Checkbox, LinearProgress, Typography} from "@mui/material";
import Swal from "sweetalert2";

function Projects({db, user}){
	const [write, setWrite] = useState(0);

	const [projects, setProjects] = useState([]);

	const handleCheckboxChange = (projectIndex, taskIndex) => {
		const updatedProjects = projects.map((project, index) => {
			if (index === projectIndex){
				const updatedTasks = project.tasks.map((task, i) => {
					if (i === taskIndex) {
						return {...task, checked: !task.checked};
					}

					return task;
				});

				const checkedTasks = updatedTasks.filter((task) => task.checked).length;

				const updatedProgress = (checkedTasks / updatedTasks.length) * 100;

				return {...project, tasks: updatedTasks, progress: updatedProgress};
			}

			return project;
		});

		setProjects(updatedProjects);

		setWrite((old) => {
			return (old + 1);
		});
	};

	const handleEditName = (projectIndex) => {
		Swal.fire({
			title: "Enter project name: ",
			input: "text",
			showCancelButton: true,
			confirmButtonColor: "#e91e63",
			cancelButtonColor: "#ed4b82",
			confirmButtonText: "CONFIRM",
			cancelButtonText: "CANCEL"
		}).then((result) => {
			if (result.isConfirmed){
				const updatedProjects = projects.map((project, index) => {
					if (index === projectIndex){
						let updatedName = project.name;

						if (result.value.length > 0){
							updatedName = result.value;
						}

						return {...project, name: updatedName};
					}

					return project;
				});

				setProjects(updatedProjects);
					
				setWrite((old) => {
					return (old + 1);
				});
			}
		});
	};

	const handleEditDeadline = (projectIndex) => {
		Swal.fire({
			title: "Enter project deaedline: ",
			input: "date",
			showCancelButton: true,
			confirmButtonColor: "#e91e63",
			cancelButtonColor: "#ed4b82",
			confirmButtonText: "CONFIRM",
			cancelButtonText: "CANCEL"
		}).then((result) => {
			if (result.isConfirmed){
				const updatedProjects = projects.map((project, index) => {
					if (index === projectIndex){
						let updatedDeadline = project.deadline;

						if (result.value.length > 0){
							updatedDeadline = result.value;
						}

						return {...project, deadline: updatedDeadline};
					}

					return project;
				});

				setProjects(updatedProjects);
			
				setWrite((old) => {
					return (old + 1);
				});
			}
		});
	};

	const handleAddTask = (projectIndex) => {
		Swal.fire({
			title: "Enter new task name: ",
			input: "text",
			showCancelButton: true,
			confirmButtonColor: "#e91e63",
			cancelButtonColor: "#ed4b82",
			confirmButtonText: "CONFIRM",
			cancelButtonText: "CANCEL"
		}).then((result) => {
			if (result.isConfirmed){
				const updatedProjects = projects.map((project, index) => {
					if (index === projectIndex){
						let newTask;

						if (result.value.length > 0){
							const checkedTasks = project.tasks.filter((task) => task.checked).length;

							const updatedProgress = (checkedTasks / (project.tasks.length + 1)) * 100;

							newTask = {
								name: result.value,
								checked: false
							};

							return {...project, tasks: [...project.tasks, newTask], progress: updatedProgress};
						}
					}

					return project;
				});

				setProjects(updatedProjects);
					
				setWrite((old) => {
					return (old + 1);
				});
			}
		});
	};

	const handleCreateProject = () => {
		const newProject = {
			name: `Project ${projects.length + 1}`,
			deadline: "2024/5/12",
			tasks: [{
				name: "Start",
				checked: false
			}],
			progress: 0
		};

		setProjects((oldProjects) => {
			return [...oldProjects, newProject];
		});

		setWrite((old) => {
			return (old + 1);
		});
	};

	const handleDeleteProject = (projectIndex) => {
		setProjects((oldProjects) => {
			const newProjects = oldProjects;

			newProjects.splice(projectIndex, 1);

			return [...newProjects];
		});

		setWrite((old) => {
			return (old + 1);
		});
	};

	const cards = projects.map((project, projectIndex) => {
		return (
            <Card key={projectIndex} style={{
            	width: "350px",
            	height: "350px"
            }}>
                <CardContent style={{
                	display: "flex",
                	flexDirection: "column",
                	alginItems: "center",
                	overflowY: "auto",
                	padding: "20px 30px"
                }}>
                	<Box style={{
                		display: "flex",
                		flexDirection: "row",
                		justifyContent: "space-between"
                	}}>
	                    <Typography variant="h6" style={{
	                    	color: "#e91e63"
	                    }}>
	                        {project.name}
	                    </Typography>

	                    <IconButton className="material-symbols-outlined" onClick={() => handleDeleteProject(projectIndex)} style={{
	                    	margin: "0px -10px 0px 0px",
	                    	color: "#e91e63"
	                    }}>
	                    	delete
	                    </IconButton>
	                </Box>

                    <Typography variant="body1" style={{
                    	color: "#e91e63"
                    }}>
                        Deadline: {project.deadline}
                    </Typography>

                    <Box style={{
                    	margin: "10px 0px 10px 0px",
                    	width: "240px",
                    	maxWidth: "95%",
                    	height: "130px",
                    	overflowY: "auto",
                    	alignSelf: "center",
                    	display: "flex",
                    	flexWrap: "wrap",
                    	gap: "5px"
                    }}>
                    	{
                    		project.tasks.map((task, taskIndex) => {
                    			return (
				                    <Typography key={taskIndex} variant="body1">
				                        <Checkbox checked={task.checked} onChange={() => {handleCheckboxChange(projectIndex, taskIndex)}}/>
				                        
				                        {task.name}
				                    </Typography>
                    			);
                    		})
                    	}
	                </Box>

                    <LinearProgress variant="determinate" value={project.progress} style={{
                    	margin: "10px 0px 20px 0px"
                    }}/>

					<ButtonGroup style={{
						alignSelf: "center"
					}}>
						<Button onClick={() => {handleEditName(projectIndex)}}> Edit name </Button>
						<Button onClick={() => {handleEditDeadline(projectIndex)}}> Edit deadline </Button>
						<Button onClick={() => {handleAddTask(projectIndex)}}> Add task </Button>
					</ButtonGroup>
                </CardContent>
            </Card>
		);
	});

	useEffect(() => {
		if (projects.length > 0){
			set(ref(db, `users/${user.uid}`), projects); 
		}
	}, [write]);

	useEffect(() => {
		get(ref(db, `users/${user.uid}`)).then((data) => {
			if (data.exists()){
				const values = data.val();

				setProjects([...values]);
			}
			else{
				setProjects([
					{
						name: "Project 1",
						deadline: "2024/5/12",
						tasks: [
							{
								name: "Task 1",
								checked: false
							},
							{
								name: "Task 2",
								checked: true
							},
							{
								name: "Task 3",
								checked: true
							},
							{
								name: "Task 4",
								checked: false
							}
						],
						progress: 50
					}
				]);

				setWrite((old) => {
					return (old + 1);
				});
			};
		});
	}, []);

    return (
        <Box
            style={{
                margin: "30px 0px",
                padding: "30px 10px",
                width: "1300px",
                maxWidth: "90%",
                height: "300px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                flexGrow: "1",
                overflowY: "auto",
                gap: "20px"
            }}
        >
            <Button variant="contained" color="secondary" onClick={handleCreateProject} style={{
            	width: "350px",
            	height: "350px",
            	display: "flex",
            	flexDirection: "column"
            }}>
                Create Project

                <Icon className="material-symbols-outlined">
                	add_circle
                </Icon>
            </Button>

            {cards}
        </Box>
    );
}

export default Projects;