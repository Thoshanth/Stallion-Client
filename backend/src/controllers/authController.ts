import { Request, Response } from 'express';
import { User } from '../models/User';
import { generateToken } from '../utils/jwt';
import { AuthRequest, ApiResponse } from '../types';

export class AuthController {
  // Register new user
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, role, phone } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({
          success: false,
          error: 'User already exists with this email',
        });
        return;
      }

      // Create new user
      const user = new User({
        name,
        email,
        password,
        role,
        phone,
      });

      await user.save();

      // Generate JWT token
      const token = generateToken({
        id: user._id.toString(),
        email: user.email,
        role: user.role,
      });

      // Set HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      const response: ApiResponse = {
        success: true,
        message: 'User registered successfully',
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
          },
          token,
        },
      };

      res.status(201).json(response);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: 'Registration failed',
        message: error.message,
      });
    }
  }

  // Login user
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Find user and include password field
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        res.status(401).json({
          success: false,
          error: 'Invalid email or password',
        });
        return;
      }

      // Check password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        res.status(401).json({
          success: false,
          error: 'Invalid email or password',
        });
        return;
      }

      // Check if user is active
      if (user.status !== 'active') {
        res.status(403).json({
          success: false,
          error: 'Account is deactivated. Please contact administrator.',
        });
        return;
      }

      // Generate JWT token
      const token = generateToken({
        id: user._id.toString(),
        email: user.email,
        role: user.role,
      });

      // Set HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      const response: ApiResponse = {
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
          },
          token,
        },
      };

      res.json(response);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: 'Login failed',
        message: error.message,
      });
    }
  }

  // Logout user
  async logout(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie('token');
      
      const response: ApiResponse = {
        success: true,
        message: 'Logout successful',
      };

      res.json(response);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: 'Logout failed',
        message: error.message,
      });
    }
  }

  // Get current user
  async getMe(req: AuthRequest, res: Response): Promise<void> {
    try {
      const user = await User.findById(req.user?.id);
      if (!user) {
        res.status(404).json({
          success: false,
          error: 'User not found',
        });
        return;
      }

      const response: ApiResponse = {
        success: true,
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
            phone: user.phone,
            profileImage: user.profileImage,
          },
        },
      };

      res.json(response);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: 'Failed to get user information',
        message: error.message,
      });
    }
  }

  // Update profile
  async updateProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { name, phone } = req.body;
      
      const user = await User.findByIdAndUpdate(
        req.user?.id,
        { 
          ...(name && { name }),
          ...(phone && { phone }),
        },
        { new: true, runValidators: true }
      );

      if (!user) {
        res.status(404).json({
          success: false,
          error: 'User not found',
        });
        return;
      }

      const response: ApiResponse = {
        success: true,
        message: 'Profile updated successfully',
        data: { user },
      };

      res.json(response);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: 'Failed to update profile',
        message: error.message,
      });
    }
  }

  // Change password
  async changePassword(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { currentPassword, newPassword } = req.body;

      const user = await User.findById(req.user?.id).select('+password');
      if (!user) {
        res.status(404).json({
          success: false,
          error: 'User not found',
        });
        return;
      }

      // Verify current password
      const isCurrentPasswordValid = await user.comparePassword(currentPassword);
      if (!isCurrentPasswordValid) {
        res.status(400).json({
          success: false,
          error: 'Current password is incorrect',
        });
        return;
      }

      // Update password
      user.password = newPassword;
      await user.save();

      const response: ApiResponse = {
        success: true,
        message: 'Password changed successfully',
      };

      res.json(response);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: 'Failed to change password',
        message: error.message,
      });
    }
  }
}