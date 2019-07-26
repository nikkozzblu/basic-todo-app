import React from 'react';

import { taskService } from '../services';
import './Tasks.css';

class Tasks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            loading: true,
            error: ''
        };

        this.addTask = this.addTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.loadTasks = this.loadTasks.bind(this);

        this.loadTasks();
    }
    loadTasks() {
        taskService.list()
            .then(data => this.setState({ loading: false, tasks: data }),
                error => this.setState({ error, loading: false }));
    }
    addTask(task) {
        this.setState({ loading: true });
        if (!task.title) {
            this.setState({ loading: false, error: 'Task must have a title' });
            return;
        }
        taskService.add(task)
            .then(data => {
                this.state.tasks.splice(0, 0, data);
                this.setState({ loading: false, error: false, tasks: this.state.tasks });
            },
                error => this.setState({ error, loading: false }));
    }
    removeTask(index) {
        this.setState({ loading: true });
        var toRemove = this.state.tasks[index];
        taskService.remove(toRemove)
            .then(() => {
                this.state.tasks.splice(index, 1)
                this.setState({ loading: false, error: false, tasks: this.state.tasks });
            },
                error => this.setState({ error, loading: false }));
    }
    editTask(task) {
        this.setState({ loading: true });
        taskService.edit(task)
            .then(() => {
                // this.state.tasks[index] = task;
                this.setState({ loading: false, error: false });
            },
                error => this.setState({ error, loading: false }));
    }
    render() {
        const { tasks, loading, error } = this.state;
        var items = tasks.map((task, index) => {
            return (
                <TaskItem key={index} index={index} item={task} remove={this.removeTask} markDone={this.editTask} />
            );
        });
        return (
            <div className="Tasks">
                {error &&
                    <div className={'alert alert-danger'}>{error}</div>
                }
                {!loading &&
                    <TaskAdd add={this.addTask} />
                }
                {loading &&
                    <div className="loading" >
                        <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    </div>
                }
                <ul className="list-group"> {items} </ul>
            </div>
        );
    }
}

class TaskItem extends React.Component {
    constructor(props) {
        super(props);
        this.onClickRemove = this.onClickRemove.bind(this);
        this.onClickDone = this.onClickDone.bind(this);
    }
    onClickRemove() {
        var index = this.props.index;
        this.props.remove(index);
    }
    onClickDone() {
        var index = this.props.index;
        this.props.item.doneyet = true;
        this.props.markDone(this.props.item, index);
    }
    render() {
        var todoClass = this.props.item.doneyet ?
            "done" : "undone";
        return (
            <li className="TaskItem list-group-item ">
                <div className={todoClass}>
                    <a href="#" aria-hidden="true" onClick={this.onClickDone}>Done</a>
                    {this.props.item.title}
                    <button type="button" className="close" onClick={this.onClickRemove}>&times;</button>
                </div>
            </li>
        );
    }
}

class TaskAdd extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        this.refs.taskTitle.focus();
    }
    onSubmit(event) {
        event.preventDefault();
        let newTask = { 'title': this.refs.taskTitle.value };
        this.props.add(newTask);
        this.refs.form.reset();
    }
    render() {
        return (
            <form ref="form" onSubmit={this.onSubmit} className="TaskAdd form-inline ">
                <input type="text" ref="taskTitle" className="form-control" placeholder="add a new todo..." />
                <button type="submit" className="btn btn-default">Add</button>
            </form>
        );
    }
}

export { Tasks }; 