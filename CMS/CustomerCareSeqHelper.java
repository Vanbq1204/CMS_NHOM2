package CMS;

/**
 * Generated from IDL alias "CustomerCareSeq".
 *
 * @author JacORB IDL compiler V 3.9
 * @version generated at Apr 4, 2025, 3:18:30 AM
 */

public abstract class CustomerCareSeqHelper
{
	private volatile static org.omg.CORBA.TypeCode _type;

	public static void insert (org.omg.CORBA.Any any, CMS.CustomerCare[] s)
	{
		any.type (type ());
		write (any.create_output_stream (), s);
	}

	public static CMS.CustomerCare[] extract (final org.omg.CORBA.Any any)
	{
		if ( any.type().kind() == org.omg.CORBA.TCKind.tk_null)
		{
			throw new org.omg.CORBA.BAD_OPERATION ("Can't extract from Any with null type.");
		}
		return read (any.create_input_stream ());
	}

	public static org.omg.CORBA.TypeCode type ()
	{
		if (_type == null)
		{
			synchronized(CustomerCareSeqHelper.class)
			{
				if (_type == null)
				{
					_type = org.omg.CORBA.ORB.init().create_alias_tc(CMS.CustomerCareSeqHelper.id(), "CustomerCareSeq",org.omg.CORBA.ORB.init().create_sequence_tc(0, org.omg.CORBA.ORB.init().create_struct_tc(CMS.CustomerCareHelper.id(),"CustomerCare",new org.omg.CORBA.StructMember[]{new org.omg.CORBA.StructMember("ticketId", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("customerId", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("issue", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("status", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("priority", org.omg.CORBA.ORB.init().create_string_tc(0), null),new org.omg.CORBA.StructMember("resolution", org.omg.CORBA.ORB.init().create_string_tc(0), null)})));
				}
			}
		}
		return _type;
	}

	public static String id()
	{
		return "IDL:CMS/CustomerCareSeq:1.0";
	}
	public static CMS.CustomerCare[] read (final org.omg.CORBA.portable.InputStream _in)
	{
		CMS.CustomerCare[] _result;
		int _l_result2 = _in.read_long();
		try
		{
			 int x = _in.available();
			 if ( x > 0 && _l_result2 > x )
				{
					throw new org.omg.CORBA.MARSHAL("Sequence length too large. Only " + x + " available and trying to assign " + _l_result2);
				}
		}
		catch (java.io.IOException e)
		{
		}
		_result = new CMS.CustomerCare[_l_result2];
		for (int i=0;i<_result.length;i++)
		{
			_result[i]=CMS.CustomerCareHelper.read(_in);
		}

		return _result;
	}

	public static void write (final org.omg.CORBA.portable.OutputStream _out, CMS.CustomerCare[] _s)
	{
		
		_out.write_long(_s.length);
		for (int i=0; i<_s.length;i++)
		{
			CMS.CustomerCareHelper.write(_out,_s[i]);
		}

	}
}
